import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import hasMissingDays from "@api/Services/TimeSeries/hasMissingDays";
import findTimeSeries from "@api/Services/TimeSeries/findTimeseries";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import fetchAndPersistIntradayTimeSeries from "@api/Services/AlphaAdvantageService/fetchAndPersistIntradayTimeSeries";

export async function findOrUpdateDb(
  metadata: TStockMetadataModel,
  endDateIn: Date | string,
  startDateIn?: Date | string
) {
  const endDate = new Date(endDateIn);
  const startDate = startDateIn ? new Date(startDateIn) : undefined;

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
