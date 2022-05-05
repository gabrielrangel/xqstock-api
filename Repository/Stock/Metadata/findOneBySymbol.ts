import { FilterQuery } from "mongoose";
import getMetadataRecursively from "@api/Services/Stock/getMetadataRecursively";
import { IMetadataSymbolSearch } from "@lib/AlphaAdvantageApi";
import MetadataRepository from ".";

export async function findOneBySymbol(symbol: string) {
  const filter: FilterQuery<IMetadataSymbolSearch> = {
    Symbol: {
      $regex: `^${Symbol}`,
    },
  };

  const StockMetaData: IMetadataSymbolSearch = await MetadataRepository.findOne(
    filter
  ).exec();

  if (StockMetaData && symbol.length / StockMetaData.Symbol.length >= 0.65) {
    return StockMetaData;
  }

  return getMetadataRecursively(symbol);
}

export default findOneBySymbol;
