import IntradayTimeSeriesRepository from "../../Repository/Stock/Timeseries/Intraday";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";

export async function findTimeSeries(
  metadata: TStockMetadataModel,
  endDateStr: string,
  startDateStr?: string
) {
  const startDate = startDateStr ? new Date(startDateStr) : undefined;
  const endDate = new Date(endDateStr);

  const query =
    startDate && endDate
      ? IntradayTimeSeriesRepository.findByMetadataAndPeriod
      : IntradayTimeSeriesRepository.findByMetadata;

  return query(metadata, endDate, startDate);
}

export default findTimeSeries;
