import { Job } from "bullmq";
import IOptions from "@api/Services/Queue/AlphaAdvantageApi/SymbolSearch/types";
import searchOrUpdateDb from "@api/Services/Metadata/search/searchOrUpdateDb";

export async function SymbolSearchQueueProcessor(job: Job<IOptions>) {
  const { keyword } = job.data;
  return searchOrUpdateDb(keyword);
}

export default SymbolSearchQueueProcessor;
