import TimeSeriesIntradayRepository from "@api/Repository/Stock/Timeseries/Intraday";
import getMetadataRecursively from "@api/Services/Stock/getMetadataRecursively";

export default async function getQuotesBySymbol (
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  const metadata = await getMetadataRecursively(symbol);

  const query =
    startDate && endDate
      ? TimeSeriesIntradayRepository.findAllBySymbolAndPeriod
      : TimeSeriesIntradayRepository.findAllBySymbol;

  const timeseries = await query(metadata, startDate, endDate);

  return {metadata, timeseries}
}