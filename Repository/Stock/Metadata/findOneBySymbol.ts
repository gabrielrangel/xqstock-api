import { dbConnect } from "@api/lib/dbConnect";
import { StockMetaDataModel } from "@api/Models/Stock/Metadata";
import { FilterQuery } from "mongoose";
import { IMetadataSymbolSearch } from "@api/lib/AlphaAdvantageApi";
import AlphaAdvantageService from "@api/Services/AlphaAdvantageService";

export async function findOneBySymbol(symbol: string) {
  const filter: FilterQuery<IMetadataSymbolSearch> = {
    Symbol: { $regex: symbol, $options: "i" },
  };

  await dbConnect();

  const StockMetaData: IMetadataSymbolSearch = await StockMetaDataModel.findOne(
    filter
  ).exec();

  if (StockMetaData) {
    return StockMetaData;
  }

  return AlphaAdvantageService.fetchAndPersistMetadata(symbol);
}

export default findOneBySymbol;
