import { MetadataRepository } from "@api/Repository/Stock/Metadata/index";

export async function searchMetadataByKeyword(keyword: string) {
  const metadata = await MetadataRepository.findByKeyword(keyword);

  return { metadata };
}


export default searchMetadataByKeyword;
