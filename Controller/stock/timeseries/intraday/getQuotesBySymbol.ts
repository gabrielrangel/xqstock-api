import { NotFound } from "@api/Error/Http";
import { MetadataRepository } from "@api/Repository/Stock/Metadata/index";
import updateHistory from "@api/Services/Session/updateHistory";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import previousFriday from "date-fns/previousFriday";
import findOrSendToQueue from "@api/Services/TimeSeries/findOrSendToQueue";

const isWeekend = (date: Date | number) => isSaturday(date) || isSunday(date);

const getLastWeekday = (date: string | number) => {
  const dateWithoutHours = new Date(date).setHours(0, 0, 0, 0);
  const lastWeekDay = isWeekend(dateWithoutHours)
    ? previousFriday(dateWithoutHours)
    : dateWithoutHours;
  return new Date(lastWeekDay);
};

export async function getQuotesBySymbol(
  symbol: string,
  startDateStr?: string | undefined,
  endDateStr?: string | undefined,
  sessionId?: string
) {
  const metadata = await MetadataRepository.findOneBySymbol(symbol);

  if (!metadata) {
    throw NotFound(`Cannot find Stock with symbol: ${symbol}`);
  }

  await updateHistory(sessionId ?? "", metadata.Symbol);

  const startDate = startDateStr
    ? getLastWeekday(startDateStr)
    : (startDateStr as undefined);

  const endDate = getLastWeekday(endDateStr ?? Date.now());

  const timeseries = await findOrSendToQueue(metadata, endDate, startDate);

  return { metadata, timeseries };
}

export default getQuotesBySymbol;
