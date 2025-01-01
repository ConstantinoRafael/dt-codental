import csv from "csvtojson";
import { clientSchema } from "../schemas/clients-schema";
import ClientRepository from "../repositories/ClientRepository";
import ClientService from "../services/ClientService";
import { getSocketIO } from "../config/socket";

type SerializedBuffer = {
  type: "Buffer";
  data: number[];
};

type FileData = {
  fileBuffer: Buffer | SerializedBuffer;
};

export async function processCsvJob(data: FileData) {
  try {
    let rawBuffer: Buffer;
    if (data.fileBuffer instanceof Buffer) {
      rawBuffer = data.fileBuffer;
    } else if ("data" in data.fileBuffer) {
      rawBuffer = Buffer.from(data.fileBuffer.data);
    } else {
      throw new Error("Invalid fileBuffer format");
    }

    const csvString = rawBuffer.toString("utf8");
    const jsonArray = await csv().fromString(csvString);

    const total = jsonArray.length;
    const BATCH_SIZE = 100; // ajuste conforme necessidade

    const errors: any[] = [];

    for (let i = 0; i < total; i++) {
      const clientData = jsonArray[i];

      try {
        const validateClient = await clientSchema.validateAsync(clientData, {
          abortEarly: false,
          convert: false,
        });

        // Verifica se CPF já existe
        const cpfExists = await ClientRepository.getByCPF(validateClient.CPF);
        if (cpfExists) {
          errors.push({
            row: i + 1,
            error: `Client with CPF ${validateClient.CPF} already exists.`,
          });
          continue;
        }

        console.log("Creating client:", validateClient);
        await ClientRepository.create(validateClient);
      } catch (validationError: any) {
        errors.push({
          row: i + 1,
          error: validationError.details
            ? validationError.details
                .map((detail: any) => detail.message)
                .join(", ")
            : validationError.message || "Unknown validation error",
        });
      }

      // --- Emissão de progresso a cada BATCH_SIZE registros
      if ((i + 1) % BATCH_SIZE === 0) {
        const io = getSocketIO();
        const progress = Math.round(((i + 1) / total) * 100);

        io.emit("csv-progress", {
          processed: i + 1,
          total,
          progress, // em %
        });

        console.log(
          `Emitted partial progress: ${i + 1} / ${total} (${progress}%)`
        );
      }
    }

    // Se ainda não tiver batido exato no batch, podemos emitir ao final
    const io = getSocketIO();
    const finalProgress = 100;
    io.emit("csv-progress", {
      processed: total,
      total,
      progress: finalProgress,
    });
    console.log(`Emitted final progress: ${total} / ${total} (100%)`);

    if (errors.length) {
      console.log("Erros encontrados durante o processamento do CSV:", errors);
    }

    // Emitir métricas finais, se desejar
    try {
      const clientMetrics = await ClientService.getClientMetrics();
      io.emit("client-metrics", clientMetrics);
      console.log("Metrics emitted:", clientMetrics);
    } catch (err) {
      console.error("Erro ao emitir métricas via Socket.io:", err);
    }
  } catch (error) {
    console.error("Erro ao processar CSV:", error);
  }
}
