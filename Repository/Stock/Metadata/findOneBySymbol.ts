import { dbConnect } from "@api/lib/dbConnect";
import { StockMetaDataModel } from "@api/Models/Stock/Metadata";
import { FilterQuery } from "mongoose";
import { IMetadataSymbolSearch } from "@api/lib/AlphaAdvantageApi";
import AlphaAdvantageService from "@api/Services/AlphaAdvantageService";

export async function findOneBySymbol(symbol: string) {
  const filter: FilterQuery<IMetadataSymbolSearch> = {
    Symbol: symbol.toUpperCase(),
  };

  await dbConnect();

  const StockMetaData = await StockMetaDataModel.findOne(filter).exec();

  console.log(symbol, StockMetaData);

  if (StockMetaData) {
    return StockMetaData;
  }

  await AlphaAdvantageService.fetchAndPersistMetadata(filter.Symbol);

  return StockMetaDataModel.findOne(filter).exec();
}

export default findOneBySymbol;
