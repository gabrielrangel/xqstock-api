import IntradayTimeSeriesRepository from "../../Repository/Stock/Timeseries/Intraday";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";

export async function findTimeSeries(
  metadata: TStockMetadataModel,
  endDate: Date,
  startDate?: Date
) {
  const query =
    startDate && endDate
      ? IntradayTimeSeriesRepository.findByMetadataAndPeriod
      : IntradayTimeSeriesRepository.findByMetadata;

  return query(metadata, endDate, startDate);
}

export default findTimeSeries;
