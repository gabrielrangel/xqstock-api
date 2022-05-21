import searchMetadata from "@api/Services/Metadata/search/searchMetadata";
import {
  queueName,
  SymbolSearchQueue,
} from "@api/Services/Queue/AlphaAdvantageApi/SymbolSearch";

export async function searchOrSendToQueue(keyword: string) {
  return searchMetadata(keyword).then(async (md) => {
    (md && md.length) || (await SymbolSearchQueue.add(queueName, { keyword }));
    return md;
  });
}

export default searchOrSendToQueue;
