import findByKeyword from "@api/Repository/Stock/Metadata/findByKeyword";

export async function searchMetadata(keyword: string) {
  return findByKeyword(keyword);
}

export default searchMetadata;
