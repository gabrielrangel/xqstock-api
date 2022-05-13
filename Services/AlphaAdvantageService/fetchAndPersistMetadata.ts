import dbConnect from "@api/lib/dbConnect";
import StockMetaDataModel from "@api/Models/Stock/Metadata";

import AlphaAdvantageApi, {
  IMetadataSymbolSearch,
} from "@api/lib/AlphaAdvantageApi";
import {MongooseError} from "mongoose";
import {AlphaAdvantageApiErrorType} from "@api/lib/AlphaAdvantageApi/util/AlphaAdvantageApiError";

export async function fetchAndPersistMetadata(
  Symbol: string,
  _retry: boolean = true
): Promise<void> {
  const {Bestmatches} = await AlphaAdvantageApi.symbolSearch(Symbol).catch(e => {
    if (e?.type === AlphaAdvantageApiErrorType) {
      console.error(e?.message)
      return {Bestmatches: []}
    }

    throw e
  });

  if (Bestmatches) {
    await dbConnect().then(() =>
      Promise.all(Bestmatches.map(match =>
          StockMetaDataModel.create(match).catch(_e =>
            console.error(`StockMetadata with symbol ${match.Symbol} already exists`)
          )
        )
      )
    )
  }

}

export default fetchAndPersistMetadata;
