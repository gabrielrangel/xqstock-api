import { Job } from "bullmq";
import IOptions from "@api/Services/Queue/AlphaAdvantageApi/types";
import findOrUpdateDb from "@api/Services/TimeSeries/findOrUpdateDb";

export async function TimeSeriesIntradayExtendedQueueProcessor(
  job: Job<IOptions>
) {
  const { metadata, endDate, startDate } = job.data;
  return findOrUpdateDb(metadata, endDate, startDate);
}

export default TimeSeriesIntradayExtendedQueueProcessor;
