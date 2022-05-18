import { Job, Queue, QueueScheduler, Worker } from "bullmq";
import AlphaAdvantageApi from "@api/lib/AlphaAdvantageApi";
import getConnection from "@api/Services/Queue/getConnection";

interface TimeSeriesIntradayExtendedOptions {
  symbol: string;
  outputsize: "compact" | "full";
}

const connection = getConnection();

const name = "TimeSeriesIntradayExtended";

export const TimeSeriesIntradayExtendedQueue =
  new Queue<TimeSeriesIntradayExtendedOptions>(name, {
    connection,
  });

export const TimeSeriesIntradayExtendedQueueScheduler = new QueueScheduler(
  name,
  { connection }
);

export const TimeSeriesIntradayExtendedQueueWorker = new Worker(
  name,
  async (job: Job<TimeSeriesIntradayExtendedOptions>) => {
    const { symbol, outputsize } = job.data;
    return AlphaAdvantageApi.timeSeriesIntradayExtended(symbol, outputsize);
  },
  { concurrency: 1, connection }
);

export default {
  TimeSeriesIntradayExtendedQueue,
  TimeSeriesIntradayExtendedQueueScheduler,
  TimeSeriesIntradayExtendedQueueWorker,
};
