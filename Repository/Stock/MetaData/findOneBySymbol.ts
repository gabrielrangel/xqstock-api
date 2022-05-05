import getMetadataRecursively from "@api/Services/Stock/getMetadataRecursively";

export default async function findOneBySymbol(symbol: string) {
  return getMetadataRecursively(symbol);
}
