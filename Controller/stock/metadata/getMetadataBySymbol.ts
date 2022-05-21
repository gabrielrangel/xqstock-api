import { NotFound } from "@api/Error/Http";
import findOrSendToQueue from "@api/Services/Metadata/find/findOrSendToQueue";

export async function getMetadataBySymbol(symbol: string) {
  const metadata = findOrSendToQueue(symbol);

  if (!metadata) {
    throw NotFound(`Cannot find Stock with symbol: ${symbol}`);
  }

  return { metadata };
}

export default getMetadataBySymbol;
