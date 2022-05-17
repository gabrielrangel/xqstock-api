import { NotFound } from "@api/Error/Http";
import { MetadataRepository } from "@api/Repository/Stock/Metadata/index";
import IntradayTimeSeriesRepository from "@api/Repository/Stock/Timeseries/Intraday";
import updateHistory from "@api/Services/Session/updateHistory";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import previousFriday from "date-fns/previousFriday";

const isWeekend = (date: Date | number) => isSaturday(date) || isSunday(date);

export async function getQuotesBySymbol(
  symbol: string,
  strStartDate?: string | undefined,
  strEndDate?: string | undefined,
  sessionId?: string
) {
  const metadata = await MetadataRepository.findOneBySymbol(symbol);

  if (!metadata) {
    throw NotFound(`Cannot find Stock with symbol: ${symbol}`);
  }

  let startDate, endDate;
  if (strStartDate && strEndDate) {
    startDate = new Date(strStartDate).setHours(0, 0, 0, 0);
    startDate = isWeekend(startDate) ? previousFriday(startDate) : startDate;
    startDate = new Date(startDate);

    endDate = new Date(strEndDate).setHours(0, 0, 0, 0);
    endDate = isWeekend(endDate) ? previousFriday(endDate) : endDate;
    endDate = new Date(endDate);
  }

  const query =
    strStartDate && strEndDate
      ? IntradayTimeSeriesRepository.findByMetadataAndPeriod
      : IntradayTimeSeriesRepository.findByMetadata;

  const timeseries = await query(metadata, endDate as Date, startDate);

  await updateHistory(sessionId ?? "", metadata.Symbol);

  return { metadata, timeseries };
}

export default getQuotesBySymbol;
