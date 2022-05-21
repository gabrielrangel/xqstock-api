import dbConnect from "@api/lib/dbConnect";
import StockMetaDataModel, {
  StockMetadataSchemaType,
} from "@api/Models/Stock/Metadata";

import AlphaAdvantageApi from "@api/lib/AlphaAdvantageApi";

const { ALPHA_API_RETRY_TIMEOUT } = process.env;

export async function fetchAndPersistMetadata(keyword: string) {
  let Bestmatches: StockMetadataSchemaType[] | undefined;

  let timeOut = false;
  setTimeout(() => (timeOut = true), Number(ALPHA_API_RETRY_TIMEOUT ?? 0));

  while (!Bestmatches && !timeOut) {
    Bestmatches = await AlphaAdvantageApi.symbolSearch(
      encodeURIComponent(keyword)
    )
      .then(({ Bestmatches }) => Bestmatches ?? [])
      .catch(() => undefined);

    if (!Bestmatches) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  if (!Bestmatches) {
    return;
  }

  await dbConnect()
    .then(() =>
      (Bestmatches as StockMetadataSchemaType[]).map((match) =>
        StockMetaDataModel.findOneAndUpdate({ Symbol: match.Symbol }, match, {
          upsert: true,
          setDefaultsOnInsert: true,
        }).exec()
      )
    )
    .then((promises) => Promise.all(promises));
}

export default fetchAndPersistMetadata;
