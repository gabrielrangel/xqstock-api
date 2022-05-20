import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import hasMissingDays from "@api/Services/TimeSeries/hasMissingDays";
import findTimeSeries from "@api/Services/TimeSeries/findTimeseries";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import fetchAndPersistIntradayTimeSeries from "@api/Services/AlphaAdvantageService/fetchAndPersistIntradayTimeSeries";
import {
  queueName,
  TimeSeriesIntradayExtendedQueue,
} from "@api/Services/Queue/AlphaAdvantageApi/TimeSeriesIntradayExtended";

export async function findOrUpdateDb(
  metadata: TStockMetadataModel,
  endDate: Date,
  startDate?: Date
) {
  const outputSize =
    !startDate || differenceInBusinessDays(endDate, startDate) > 100
      ? "full"
      : "compact";

  return findTimeSeries(metadata, endDate, startDate).then(async (ts) =>
    hasMissingDays(ts, metadata.Region, endDate, startDate).then((hmd) => {
      hmd && fetchAndPersistIntradayTimeSeries(metadata, outputSize);
      return { isComplete: !hmd, timeseries: ts };
    })
  );
}

export default findOrUpdateDb;
