import dbConnect from "@lib/dbConnect";
import StockMetaDataModel from "@api/Models/Stock/Metadata";
import MetadataRepository from "@api/Repository/Stock/Metadata";

import AlphaAdvantageApi, {
  IMetadataSymbolSearch,
} from "@lib/AlphaAdvantageApi";

export default async function getMetadataRecursively(
  Symbol: string,
  _retry: boolean = true
): Promise<Partial<IMetadataSymbolSearch> | null> {
  const { Bestmatches } = await AlphaAdvantageApi.symbolSearch(Symbol);
  const Bestmatch = Bestmatches.pop();

  if (!Bestmatch) {
    return null;
  }

  await dbConnect();

  return StockMetaDataModel.create(Bestmatch).catch((e) => {
    if (e?.name === "MongoServerError" && e?.code === 11000) {
      return MetadataRepository.find({ Symbol: Bestmatch.Symbol });
    }

    throw e;
  });
}
