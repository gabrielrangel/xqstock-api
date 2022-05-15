import dbConnect from "@api/lib/dbConnect";
import StockMetaDataModel from "@api/Models/Stock/Metadata";

import AlphaAdvantageApi from "@api/lib/AlphaAdvantageApi";
import { AlphaAdvantageApiErrorType } from "@api/lib/AlphaAdvantageApi/util/AlphaAdvantageApiError";

export async function fetchAndPersistMetadata(Symbol: string) {
  const Bestmatches = await AlphaAdvantageApi.symbolSearch(Symbol)
    .catch((e) => {
      if (e?.type === AlphaAdvantageApiErrorType) {
        console.error(e?.message);
        return { Bestmatches: [] };
      }

      throw e;
    })
    .then(({ Bestmatches }) => Bestmatches ?? []);

  await dbConnect();

  Promise.all(
    Bestmatches.map((match) =>
      StockMetaDataModel.findOneAndUpdate({ Symbol: match.Symbol }, match, {
        upsert: true,
        setDefaultsOnInsert: true,
      }).exec()
    )
  );
}

export default fetchAndPersistMetadata;
