import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import previousFriday from "date-fns/previousFriday";
import NoContent from "@api/Error/Http/NoContent";
import updateHistory from "@api/Services/Session/updateHistory";
import findMetadataOrSendToQueue from "@api/Services/Metadata/find/findOrSendToQueue";
import { Job } from "bullmq";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import findTimeSerieOrSendToQueue from "@api/Services/TimeSeries/findOrSendToQueue";

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
  const metadata = await findMetadataOrSendToQueue(symbol);

  if ((metadata as Job)?.queueName) {
    throw NoContent(`Trying to get symbol ${symbol} metadata`);
  }

  await updateHistory(
    sessionId ?? "",
    (metadata as TStockMetadataModel).Symbol
  );

  const startDate = startDateStr
    ? getLastWeekday(startDateStr)
    : (startDateStr as undefined);

  const endDate = getLastWeekday(endDateStr ?? Date.now());

  const timeseries = await findTimeSerieOrSendToQueue(
    metadata as TStockMetadataModel,
    endDate,
    startDate
  );

  if (!Array.isArray(timeseries)) {
    throw NoContent(`Trying to get timeseries for symbol ${symbol}`);
  }

  return { metadata, timeseries };
}

export default getQuotesBySymbol;
