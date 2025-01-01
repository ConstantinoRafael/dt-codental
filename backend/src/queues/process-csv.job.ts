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
    const errors: any[] = [];

    // Para controlar o tempo de emissão
    let lastEmitTime = Date.now();
    const EMIT_INTERVAL = 2000; // 2 segundos (2000 ms)

    for (let i = 0; i < total; i++) {
      const clientData = jsonArray[i];

      try {
        const validateClient = await clientSchema.validateAsync(clientData, {
          abortEarly: false,
          convert: false,
        });

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

      // --- Emissão de progresso a cada X segundos
      const now = Date.now();
      if (now - lastEmitTime >= EMIT_INTERVAL) {
        const progress = Math.round(((i + 1) / total) * 100);
        const io = getSocketIO();
        io.emit("csv-progress", {
          processed: i + 1,
          total,
          progress,
        });

        console.log(
          `Emitted partial progress: ${i + 1} / ${total} (${progress}%)`
        );

        lastEmitTime = now; // atualiza o "último emit"
      }
    }

    // Emissão final (garantir 100%)
    const io = getSocketIO();
    io.emit("csv-progress", {
      processed: total,
      total,
      progress: 100,
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
