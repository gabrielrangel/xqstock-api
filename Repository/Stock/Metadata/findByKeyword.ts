import {dbConnect} from "@api/lib/dbConnect";
import {StockMetaDataModel} from "@api/Models/Stock/Metadata";
import {FilterQuery} from "mongoose";
import {IMetadataSymbolSearch} from "@api/lib/AlphaAdvantageApi";
import AlphaAdvantageService from "@api/Services/AlphaAdvantageService";

export async function findByKeyword(keyword: string) {
  const filter: FilterQuery<IMetadataSymbolSearch> = {
    $or: [
      {Symbol: {$regex: keyword, $options: "i"}},
      {Name: {$regex: keyword, $options: "i"}},
    ]
  };

  await dbConnect();

  const StockMetaData: IMetadataSymbolSearch[] = await StockMetaDataModel.find(
    filter
  ).exec();

  if (StockMetaData.length === 0) {
    await AlphaAdvantageService.fetchAndPersistMetadata(keyword);
  }

  return StockMetaDataModel.find(
    filter
  ).exec();
}

export default findByKeyword;
