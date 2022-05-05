import dbConnect from "@api/lib/dbConnect";
import StockMetaDataModel from "@api/Models/Stock/Metadata";

import AlphaAdvantageApi, {
  IMetadataSymbolSearch,
} from "@api/lib/AlphaAdvantageApi";

export async function fetchAndPersistMetadata(
  Symbol: string,
  _retry: boolean = true
): Promise<Partial<IMetadataSymbolSearch> | null> {
  const Bestmatch = await AlphaAdvantageApi.symbolSearch(Symbol).then(
    ({ Bestmatches }) =>
      Bestmatches.filter(({ Matchscore }) => parseFloat(Matchscore) >= 1).pop()
  );

  if (!Bestmatch) {
    return null;
  }

  await dbConnect();

  return StockMetaDataModel.create(Bestmatch).catch((e) => {
    if (e?.name === "MongoServerError" && e?.code === 11000) {
      return StockMetaDataModel.findOne({ Symbol: Bestmatch.Symbol });
    }

    throw e;
  });
}

export default fetchAndPersistMetadata;
