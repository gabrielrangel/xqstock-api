import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import hasMissingDays from "@api/Services/TimeSeries/hasMissingDays";
import {
  queueName,
  TimeSeriesIntradayExtendedQueue,
} from "@api/Services/Queue/AlphaAdvantageApi/TimeSeriesIntradayExtended";
import findTimeSeries from "@api/Services/TimeSeries/findTimeseries";

export async function findOrSendToQueue(
  metadata: TStockMetadataModel,
  endDate: Date,
  startDate?: Date
) {
  return findTimeSeries(metadata, endDate, startDate).then(async (ts) => {
    const data = { metadata, endDate, startDate };
    return hasMissingDays(ts, metadata.Region, endDate, startDate).then(
      (hmd) => {
        hmd && TimeSeriesIntradayExtendedQueue.add(queueName, data);
        return { isComplete: !hmd, timeseries: ts };
      }
    );
  });
}

export default findOrSendToQueue;
