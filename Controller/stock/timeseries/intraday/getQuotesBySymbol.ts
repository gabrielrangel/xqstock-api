import TimeSeriesIntradayRepository from "@api/Repository/Stock/Timeseries/Intraday";
import getMetadataRecursively from "@api/Services/Stock/getMetadataRecursively";

export default async function getQuotesBySymbol (
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  const metadata = await getMetadataRecursively(
    Array.isArray(symbol) ? symbol.pop() : symbol
  );

  const query =
    startDate && endDate
      ? TimeSeriesIntradayRepository.findAllBySymbolAndPeriod
      : TimeSeriesIntradayRepository.findAllBySymbol;

  const timeseries = await query(
    metadata,
    Array.isArray(startDate) ? startDate.pop() : startDate,
    Array.isArray(endDate) ? endDate.pop() : endDate
  );

  return {metadata, timeseries}
}