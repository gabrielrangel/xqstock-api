import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import hasMissingDays from "@api/Services/TimeSeries/hasMissingDays";
import {
  queueName,
  TimeSeriesIntradayExtendedQueue,
} from "@api/Services/Queue/AlphaAdvantageApi/TimeSeriesIntradayExtended";
import { TStockTimeSeriesModel } from "@api/Models/Stock/TimeSeries";
import { Job } from "bullmq";
import findTimeSeries from "@api/Services/TimeSeries/findTimeseries";

export async function findOrSendToQueue(
  metadata: TStockMetadataModel,
  endDate: Date,
  startDate?: Date
) {
  return findTimeSeries(metadata, endDate, startDate).then(
    async (ts): Promise<TStockTimeSeriesModel[] | Job | PromiseLike<Job>> =>
      !(await hasMissingDays(ts, metadata.Region, endDate, startDate))
        ? ts
        : TimeSeriesIntradayExtendedQueue.add(queueName, {
            metadata,
            endDate,
            startDate,
          })
  );
}

export default findOrSendToQueue;
