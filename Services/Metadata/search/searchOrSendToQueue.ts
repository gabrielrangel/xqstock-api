import searchMetadata from "@api/Services/Metadata/search/searchMetadata";
import {
  queueName,
  SymbolSearchQueue,
} from "@api/Services/Queue/AlphaAdvantageApi/SymbolSearch";

export async function searchOrSendToQueue(keyword: string) {
  return searchMetadata(keyword).then(async (md) =>
    md && md.length > 0 ? md : SymbolSearchQueue.add(queueName, { keyword })
  );
}

export default searchOrSendToQueue;
