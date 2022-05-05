import getMetadataRecursively from "@api/Services/Stock/getMetadataRecursively";

export async function findOneBySymbol(symbol: string) {
  return getMetadataRecursively(symbol);
}

export default findOneBySymbol;
