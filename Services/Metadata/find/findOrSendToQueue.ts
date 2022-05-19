import {
  queueName,
  SymbolSearchQueue,
} from "@api/Services/Queue/AlphaAdvantageApi/SymbolSearch";
import findMetadata from "@api/Services/Metadata/find/findMetadata";

export async function findOrSendToQueue(keyword: string) {
  return findMetadata(keyword).then(async (md) =>
    md ? md : SymbolSearchQueue.add(queueName, { keyword })
  );
}

export default findOrSendToQueue;
