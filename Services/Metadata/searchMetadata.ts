import searchMetadataByKeyword from "@api/Controller/stock/metadata/searchMetadataByKeyword";

export async function searchMetadata(keyword: string) {
  return searchMetadataByKeyword(keyword);
}

export default searchMetadata;
