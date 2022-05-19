import { Job } from "bullmq";
import IOptions from "@api/Services/Queue/AlphaAdvantageApi/SymbolSearch/types";
import fetchAndPersistMetadata from "@api/Services/AlphaAdvantageService/fetchAndPersistMetadata";

export async function SymbolSearchQueueProcessor(job: Job<IOptions>) {
  const { keyword } = job.data;
  return fetchAndPersistMetadata(keyword);
}

export default SymbolSearchQueueProcessor;
