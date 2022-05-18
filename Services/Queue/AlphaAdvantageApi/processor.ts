import { Job } from "bullmq";
import IOptions from "@api/Services/Queue/AlphaAdvantageApi/types";
import AlphaAdvantageApi from "@api/lib/AlphaAdvantageApi";

export async function TimeSeriesIntradayExtendedQueueProcessor(
  job: Job<IOptions>
) {
  const { symbol, outputsize } = job.data;
  return AlphaAdvantageApi.timeSeriesIntradayExtended(symbol, outputsize);
}

export default TimeSeriesIntradayExtendedQueueProcessor;
