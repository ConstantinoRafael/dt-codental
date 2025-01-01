// queues.ts

import { Queue, Worker } from "bullmq";
import { redisConfig } from "../config/redis";
import { processCsvJob } from "./process-csv.job";

export const clientsQueueName = "clients-csv-queue";

// Inicializa a fila
export const clientsQueue = new Queue(clientsQueueName, {
  connection: redisConfig,
});

// Worker que processa os jobs
export const clientsWorker = new Worker(
  clientsQueueName,
  async (job) => {
    await processCsvJob(job.data);
  },
  { connection: redisConfig }
);

// Eventos de log
clientsWorker.on("failed", (job, err) => {
  if (job) {
    console.error(`Job ${job.id} falhou`, err);
  } else {
    console.error(`Job falhou`, err);
  }
});

clientsWorker.on("completed", (job) => {
  console.log(`Job ${job.id} finalizado com sucesso!`);
});
