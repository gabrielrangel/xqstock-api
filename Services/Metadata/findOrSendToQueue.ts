import searchMetadata from "@api/Services/Metadata/searchMetadata";
import {
  queueName,
  SymbolSearchQueue,
} from "@api/Services/Queue/AlphaAdvantageApi/SymbolSearch";

export async function findOrSendToQueue(keyword: string) {
  return searchMetadata(keyword).then(async (md) =>
    md.length > 0 ? md : SymbolSearchQueue.add(queueName, { keyword })
  );
}

export default findOrSendToQueue;
