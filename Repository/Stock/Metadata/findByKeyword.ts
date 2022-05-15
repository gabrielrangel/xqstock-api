import { dbConnect } from "@api/lib/dbConnect";
import {
  StockMetaDataModel,
  TStockMetadataModel,
} from "@api/Models/Stock/Metadata";
import { FilterQuery } from "mongoose";
import AlphaAdvantageService from "@api/Services/AlphaAdvantageService";
import escapeRegExp from "lodash.escaperegexp";
import deburr from "lodash.deburr";
import { StockTimeSerieSchemaType } from "@api/Models/Stock/TimeSeries";

export async function findByKeyword(
  rawKeyword: string
): Promise<(TStockMetadataModel | null)[]> {
  let keyword = deburr(rawKeyword);
  keyword = escapeRegExp(keyword);

  const filter: FilterQuery<StockTimeSerieSchemaType> = {
    $text: { $search: keyword },
    $orderby: { Symbol: -1 },
  };

  await dbConnect();

  const StockMetaData = await StockMetaDataModel.find(filter).exec();

  if (StockMetaData.length > 0) {
    return StockMetaData;
  }

  await AlphaAdvantageService.fetchAndPersistMetadata(keyword);

  return StockMetaDataModel.find(filter).exec();
}

export default findByKeyword;
