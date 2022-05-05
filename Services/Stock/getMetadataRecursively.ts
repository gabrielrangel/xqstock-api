import dbConnect from "@lib/dbConnect";
import StockMetaDataModel, { IStockMetaData } from "@api/Models/Stock/MetaData";
import AlphaAdvantageApi from "@lib/AlphaAdvantageApi";

export default async function getMetadataRecursively(
  symbol: string,
  _retry: boolean = true
): Promise<IStockMetaData | null> {
  await dbConnect();

  let StockMetaData = await StockMetaDataModel.findOne({ symbol }).exec();

  if (StockMetaData) {
    return StockMetaData;
  }

  const { Bestmatches } = await AlphaAdvantageApi.symbolSearch(symbol);
  const data = Bestmatches.pop();

  if (!data) {
    return null;
  }

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
