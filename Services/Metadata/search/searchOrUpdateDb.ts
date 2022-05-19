import searchMetadata from "@api/Services/Metadata/search/searchMetadata";
import fetchAndPersistMetadata from "@api/Services/AlphaAdvantageService/fetchAndPersistMetadata";

export async function searchOrUpdateDb(keyword: string) {
  return searchMetadata(keyword).then(async (md) =>
    md && md.length > 0 ? md : fetchAndPersistMetadata(keyword)
  );
}

export default searchOrUpdateDb;
