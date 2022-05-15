import { MetadataRepository } from "../../../Repository/Stock/Metadata";

export async function searchMetadataByKeyword(keyword: string) {
  const metadata = await MetadataRepository.findByKeyword(keyword);

  return { metadata };
}


export default searchMetadataByKeyword;
