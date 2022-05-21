import { dbConnect } from "@api/lib/dbConnect";
import { StockMetaDataModel } from "@api/Models/Stock/Metadata";
import { FilterQuery } from "mongoose";
import { IMetadataSymbolSearch } from "@api/lib/AlphaAdvantageApi";

export async function findOneBySymbol(symbol: string) {
  const filter: FilterQuery<IMetadataSymbolSearch> = {
    Symbol: symbol.toUpperCase(),
  };

  return dbConnect().then((_) => StockMetaDataModel.findOne(filter).exec());
}

export default findOneBySymbol;
