import { Queue, QueueScheduler, Worker } from "bullmq";
import getConnection from "@api/Services/Queue/getConnection";
import IOptions from "@api/Services/Queue/AlphaAdvantageApi/types";
import processor from "./processor";

const name = "TimeSeriesIntradayExtended";

// @ts-ignore
global[name] = global[name] ?? {};

// @ts-ignore
const cached = global[name] as {
  queue: Queue | undefined;
  worker: Worker | undefined;
  scheduler: QueueScheduler | undefined;
};

const connection = getConnection();

export const TimeSeriesIntradayExtendedQueue = (cached.queue =
  cached.queue ?? new Queue<IOptions>(name, { connection }));

export const TimeSeriesIntradayExtendedQueueScheduler = (cached.scheduler =
  cached.scheduler ?? new QueueScheduler(name, { connection }));

export const TimeSeriesIntradayExtendedQueueWorker = (cached.worker =
  cached.worker ?? new Worker(name, processor, { concurrency: 1, connection }));

export default {
  TimeSeriesIntradayExtendedQueue,
  TimeSeriesIntradayExtendedQueueScheduler,
  TimeSeriesIntradayExtendedQueueWorker,
};
