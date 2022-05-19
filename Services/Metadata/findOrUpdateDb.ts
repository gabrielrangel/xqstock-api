import searchMetadata from "@api/Services/Metadata/searchMetadata";
import fetchAndPersistMetadata from "@api/Services/AlphaAdvantageService/fetchAndPersistMetadata";

export async function findOrUpdateDb(keyword: string) {
  return searchMetadata(keyword).then(async (md) =>
    md.length > 0 ? md : fetchAndPersistMetadata(keyword)
  );
}

export default findOrUpdateDb;
