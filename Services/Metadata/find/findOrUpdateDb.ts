import searchMetadata from "@api/Services/Metadata/search/searchMetadata";
import fetchAndPersistMetadata from "@api/Services/AlphaAdvantageService/fetchAndPersistMetadata";

export async function findOrUpdateDb(keyword: string) {
  return searchMetadata(keyword).then(async (md) =>
    md ? md : await fetchAndPersistMetadata(keyword)
  );
}

export default findOrUpdateDb;
