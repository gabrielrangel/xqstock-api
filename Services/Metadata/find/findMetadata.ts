import findOneBySymbol from "@api/Repository/Stock/Metadata/findOneBySymbol";

export async function searchMetadata(keyword: string) {
  return findOneBySymbol(keyword);
}

export default searchMetadata;
