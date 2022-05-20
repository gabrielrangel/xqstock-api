import searchOrSendToQueue from "@api/Services/Metadata/search/searchOrSendToQueue";

export async function searchMetadataByKeyword(keyword: string) {
  return keyword.length > 4 ? await searchOrSendToQueue(keyword) : [];
}

export default searchMetadataByKeyword;
