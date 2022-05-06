import { NotFound } from "@api/Error/Http";
import { MetadataRepository } from "@api/Repository/Stock/Metadata/index";

export async function getMetadataBySymbol(symbol: string) {
  const metadata = await MetadataRepository.findOneBySymbol(symbol);

  if (!metadata) {
    throw NotFound(`Cannot find Stock with symbol: ${symbol}`);
  }

  return { metadata };
}


export default getMetadataBySymbol;
