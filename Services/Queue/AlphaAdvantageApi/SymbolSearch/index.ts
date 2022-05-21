import { Queue, QueueScheduler, Worker } from "bullmq";
import getConnection from "@api/Services/Queue/getConnection";
import IOptions from "@api/Services/Queue/AlphaAdvantageApi/TimeSeriesIntradayExtended/types";
import processor from "./processor";

export const queueName = "SymbolSearch";

// @ts-ignore
global[queueName] = global[queueName] ?? {};

// @ts-ignore
const cached = global[queueName] as {
  queue: Queue | undefined;
  worker: Worker | undefined;
  scheduler: QueueScheduler | undefined;
};

const connection = getConnection();

export const SymbolSearchQueue = (cached.queue =
  cached.queue ?? new Queue<IOptions>(queueName, { connection }));

export const SymbolSearchQueueScheduler = (cached.scheduler =
  cached.scheduler ?? new QueueScheduler(queueName, { connection }));

export const SymbolSearchWorker = (cached.worker =
  cached.worker ??
  new Worker(queueName, processor, { concurrency: 1, connection }));

export default {
  SymbolSearchQueue,
  SymbolSearchQueueScheduler,
  SymbolSearchWorker,
};
