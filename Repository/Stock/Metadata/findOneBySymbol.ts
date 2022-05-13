import {dbConnect} from "@api/lib/dbConnect";
import {StockMetaDataModel} from "@api/Models/Stock/Metadata";
import {FilterQuery} from "mongoose";
import {IMetadataSymbolSearch} from "@api/lib/AlphaAdvantageApi";
import AlphaAdvantageService from "@api/Services/AlphaAdvantageService";

export async function findOneBySymbol(Symbol: string): Promise<IMetadataSymbolSearch | undefined> {
  const filter: FilterQuery<IMetadataSymbolSearch> = {Symbol: Symbol.toUpperCase()};

  await dbConnect();

  const StockMetaData: IMetadataSymbolSearch = await StockMetaDataModel.findOne(
    filter
  ).exec();

  if (StockMetaData) {
    return StockMetaData;
  }

  await AlphaAdvantageService.fetchAndPersistMetadata(filter.Symbol);

  return StockMetaDataModel.findOne(filter).exec();
}

export default findOneBySymbol;
