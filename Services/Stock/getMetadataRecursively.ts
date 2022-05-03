import dbConnect from "@lib/dbConnect";
import StockMetaDataModel from "@api/Models/Stock/MetaData";
import AlphaAdvantageApi from "@lib/AlphaAdvantageApi";

export default async function getMetadataRecursively(symbol: string) {
  await dbConnect();

  let StockMetaData = await StockMetaDataModel.findOne({ symbol }).exec();

  if (StockMetaData) {
    return StockMetaData;
  }

  const alphaAdvantage = AlphaAdvantageApi();
  const { bestMatches } = await alphaAdvantage.symbolSearch(symbol);
  const [firstMatch] = bestMatches;

  const data = Object.entries(firstMatch).reduce((acc, [rawKey, value]) => {
    const key = rawKey.replace(/\d+\.|\s/g, "");
    return { ...acc, [key]: value };
  }, {} as Record<string, string>);

  return StockMetaDataModel.create(data);
}
