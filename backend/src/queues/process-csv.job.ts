import csv from "csvtojson";
import { clientSchema } from "../schemas/clients-schema";
import ClientRepository from "../repositories/ClientRepository";

// Tipagem auxiliar para lidar com o buffer serializado
type SerializedBuffer = {
  type: "Buffer";
  data: number[];
};

// Caso queira tipar mais genericamente, podemos dizer que data.fileBuffer
// pode ser tanto um Buffer "de verdade" quanto o objeto serializado.
type FileData = {
  fileBuffer: Buffer | SerializedBuffer;
};

export async function processCsvJob(data: FileData) {
  try {
    // Se chegar como { type: 'Buffer', data: [] }, convertemos de volta para um Buffer real.
    let rawBuffer: Buffer;
    if (data.fileBuffer instanceof Buffer) {
      rawBuffer = data.fileBuffer;
    } else {
      if ("data" in data.fileBuffer) {
        rawBuffer = Buffer.from(data.fileBuffer.data);
      } else {
        throw new Error("Invalid fileBuffer format");
      }
    }

    // Converte o Buffer para string, para ser lido pelo csvtojson
    const csvString = rawBuffer.toString("utf8");

    // Faz o parse do CSV para JSON
    const jsonArray = await csv().fromString(csvString);

    const errors: any[] = [];

    for (const [index, clientData] of jsonArray.entries()) {
      try {
        // Validação
        const validateClient = await clientSchema.validateAsync(clientData, {
          abortEarly: false,
          convert: false,
        });

        // Verifica se CPF já existe
        const cpfExists = await ClientRepository.getByCPF(validateClient.CPF);
        if (cpfExists) {
          errors.push({
            row: index + 1,
            error: `Client with CPF ${validateClient.CPF} already exists.`,
          });
          continue;
        }

        console.log("Creating client:", validateClient);

        // Cria no repositório
        await ClientRepository.create(validateClient);
      } catch (validationError: any) {
        errors.push({
          row: index + 1,
          error: validationError.details
            ? validationError.details
                .map((detail: any) => detail.message)
                .join(", ")
            : validationError.message || "Unknown validation error",
        });
      }
    }

    if (errors.length) {
      console.log("Erros encontrados durante o processamento do CSV:", errors);
      // Você pode salvar esses erros em algum lugar, retornar em outro job, etc.
    }
  } catch (error) {
    console.error("Erro ao processar CSV:", error);
  }
}
