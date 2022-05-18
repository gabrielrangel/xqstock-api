import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import hasMissingDays from "@api/Services/TimeSeries/hasMissingDays";
import findTimeSeries from "@api/Services/TimeSeries/findTimeseries";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import fetchAndPersistIntradayTimeSeries from "@api/Services/AlphaAdvantageService/fetchAndPersistIntradayTimeSeries";

export async function findOrUpdateDb(
  metadata: TStockMetadataModel,
  endDateStr: string,
  startDateStr?: string
) {
  const startDate = startDateStr ? new Date(startDateStr) : undefined;
  const endDate = new Date(endDateStr);

  const outputSize =
    !startDate || differenceInBusinessDays(endDate, startDate) > 100
      ? "full"
      : "compact";

  return findTimeSeries(metadata, endDateStr, startDateStr).then((ts) =>
    !startDate || !hasMissingDays(ts, metadata.Region, startDate, endDate)
      ? ts
      : fetchAndPersistIntradayTimeSeries(metadata, outputSize)
  );
}

export default findOrUpdateDb;
