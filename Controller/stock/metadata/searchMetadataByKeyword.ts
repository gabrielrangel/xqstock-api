import searchOrSendToQueue from "@api/Services/Metadata/search/searchOrSendToQueue";
import searchMetadata from "@api/Services/Metadata/search/searchMetadata";

export async function searchMetadataByKeyword(keyword: string) {
  return keyword.length > 4
    ? await searchOrSendToQueue(keyword)
    : await searchMetadata(keyword);
}

export default searchMetadataByKeyword;
