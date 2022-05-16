import { NotFound } from "@api/Error/Http";
import { MetadataRepository } from "@api/Repository/Stock/Metadata/index";
import IntradayTimeSeriesRepository from "@api/Repository/Stock/Timeseries/Intraday";
import { ParsedQs } from "qs";
import updateHistory from "@api/Services/Session/updateHistory";

export async function getQuotesBySymbol(
  symbol: string,
  startDate?: string | ParsedQs | undefined,
  endDate?: string | ParsedQs | undefined,
  sessionId?: string
) {
  const metadata = await MetadataRepository.findOneBySymbol(symbol);

  if (!metadata) {
    throw NotFound(`Cannot find Stock with symbol: ${symbol}`);
  }

  const query =
    startDate && endDate
      ? IntradayTimeSeriesRepository.findByMetadataAndPeriod
      : IntradayTimeSeriesRepository.findByMetadata;

  const timeseries = await query(
    metadata,
    new Date(String(endDate)),
    new Date(String(startDate))
  );

  await updateHistory(sessionId ?? "", metadata.Symbol);

  return { metadata, timeseries };
}

export default getQuotesBySymbol;
