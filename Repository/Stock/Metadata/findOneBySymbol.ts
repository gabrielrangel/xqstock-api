import { dbConnect } from "@lib/dbConnect";
import { StockMetaDataModel } from "@api/Models/Stock/Metadata";
import { FilterQuery } from "mongoose";
import { IMetadataSymbolSearch } from "@lib/AlphaAdvantageApi";
import AlphaAdvantageService from "@api/Services/AlphaAdvantageService";

export async function findOneBySymbol(symbol: string) {
  const filter: FilterQuery<IMetadataSymbolSearch> = {
    Symbol,
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
