import dbConnect from "@api/lib/dbConnect";
import StockMetaDataModel from "@api/Models/Stock/Metadata";

import AlphaAdvantageApi from "@api/lib/AlphaAdvantageApi";

const { ALPHA_API_RETRY_TIMEOUT } = process.env;

export async function fetchAndPersistMetadata(Symbol: string) {
  let Bestmatches;

  let timeOut = false;
  setTimeout(() => (timeOut = true), Number(ALPHA_API_RETRY_TIMEOUT ?? 0));

  while (!Bestmatches && !timeOut) {
    Bestmatches = await AlphaAdvantageApi.symbolSearch(Symbol)
      .then(({ Bestmatches }) => Bestmatches ?? [])
      .catch(() => undefined);

    if (!Bestmatches) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  if (!Bestmatches) {
    return;
  }

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
