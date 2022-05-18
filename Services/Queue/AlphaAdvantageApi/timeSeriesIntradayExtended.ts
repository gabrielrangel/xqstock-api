import { Queue, QueueScheduler, Worker } from "bullmq";
import getConnection from "@api/Services/Queue/getConnection";
import IOptions from "@api/Services/Queue/AlphaAdvantageApi/types";
import processor from "./processor";

export const queueName = "TimeSeriesIntradayExtended";

// @ts-ignore
global[queueName] = global[queueName] ?? {};

// @ts-ignore
const cached = global[queueName] as {
  queue: Queue | undefined;
  worker: Worker | undefined;
  scheduler: QueueScheduler | undefined;
};

const connection = getConnection();

export const TimeSeriesIntradayExtendedQueue = (cached.queue =
  cached.queue ?? new Queue<IOptions>(queueName, { connection }));

export const TimeSeriesIntradayExtendedQueueScheduler = (cached.scheduler =
  cached.scheduler ?? new QueueScheduler(queueName, { connection }));

export const TimeSeriesIntradayExtendedQueueWorker = (cached.worker =
  cached.worker ??
  new Worker(queueName, processor, { concurrency: 1, connection }));

export default {
  TimeSeriesIntradayExtendedQueue,
  TimeSeriesIntradayExtendedQueueScheduler,
  TimeSeriesIntradayExtendedQueueWorker,
};
