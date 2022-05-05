import { MetadataRepository } from "@api/Repository/Stock/Metadata/index";
import IntradayTimeSeriesRepository from "@api/Repository/Stock/Timeseries/Intraday";

export default async function getQuotesBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  const metadata = await MetadataRepository.findOneBySymbol(symbol);

  const query =
    startDate && endDate
      ? IntradayTimeSeriesRepository.findByMetadataAndPeriod
      : IntradayTimeSeriesRepository.findByMetadata;

  const timeseries = await query(metadata, startDate, endDate);

  return { metadata, timeseries };
}
