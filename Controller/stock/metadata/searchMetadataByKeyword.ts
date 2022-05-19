import { MetadataRepository } from "../../../Repository/Stock/Metadata";

export async function searchMetadataByKeyword(keyword: string) {
  return await MetadataRepository.findByKeyword(keyword);
}

export default searchMetadataByKeyword;
