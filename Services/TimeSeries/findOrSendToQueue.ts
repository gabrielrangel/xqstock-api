import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import hasMissingDays from "@api/Services/TimeSeries/hasMissingDays";
import {
  queueName,
  TimeSeriesIntradayExtendedQueue,
} from "@api/Services/Queue/AlphaAdvantageApi/timeSeriesIntradayExtended";
import { TStockTimeSeriesModel } from "@api/Models/Stock/TimeSeries";
import { Job } from "bullmq";
import findTimeSeries from "@api/Services/TimeSeries/findTimeseries";

export async function findOrSendToQueue(
  metadata: TStockMetadataModel,
  endDateStr: string,
  startDateStr?: string
) {
  const startDate = startDateStr ? new Date(startDateStr) : undefined;
  const endDate = new Date(endDateStr);

  return findTimeSeries(metadata, endDateStr, startDateStr).then(
    (ts): TStockTimeSeriesModel[] | Job | PromiseLike<Job> =>
      !startDate || !hasMissingDays(ts, metadata.Region, startDate, endDate)
        ? ts
        : TimeSeriesIntradayExtendedQueue.add(queueName, {})
  );
}

export default findOrSendToQueue;
