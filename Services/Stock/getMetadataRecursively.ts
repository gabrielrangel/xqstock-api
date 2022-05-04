import dbConnect from "@lib/dbConnect";
import StockMetaDataModel, { IStockMetaData } from "@api/Models/Stock/MetaData";
import AlphaAdvantageApi from "@lib/AlphaAdvantageApi";
import normalizeAlphaAdvantageObjKeys from "@lib/AlphaAdvantageApi/util/normalizeAlphaAdvantageObjKeys";

export default async function getMetadataRecursively(
  symbol: string,
  _retry: boolean = true
): Promise<IStockMetaData | null> {
  await dbConnect();

  let StockMetaData = await StockMetaDataModel.findOne({ symbol }).exec();

  if (StockMetaData) {
    return StockMetaData;
  }

  const alphaAdvantage = AlphaAdvantageApi();
  const { bestMatches } = await alphaAdvantage.symbolSearch(symbol);
  const [firstMatch] = bestMatches;

  if (!firstMatch) {
    return null;
  }

  const data = normalizeAlphaAdvantageObjKeys(firstMatch) as IStockMetaData;

  try {
    StockMetaData = await StockMetaDataModel.create(data);
  } catch (e) {
    if (_retry && e?.name === "MongoServerError" && e?.code === 11000) {
      return getMetadataRecursively(data.symbol, false);
    }
    throw e;
  }

  return StockMetaData;
}
