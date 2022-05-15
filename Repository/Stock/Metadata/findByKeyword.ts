import {dbConnect} from "@api/lib/dbConnect";
import {StockMetaDataModel} from "@api/Models/Stock/Metadata";
import {FilterQuery} from "mongoose";
import {IMetadataSymbolSearch} from "@api/lib/AlphaAdvantageApi";
import AlphaAdvantageService from "@api/Services/AlphaAdvantageService";
import escapeRegExp from 'lodash.escaperegexp';
import deburr from 'lodash.deburr';

export async function findByKeyword(rawKeyword: string) {
  let keyword = deburr(rawKeyword);
  keyword = escapeRegExp(keyword);

  const filter: FilterQuery<IMetadataSymbolSearch> = { $text: { $search: keyword }, $orderby: {Symbol: -1} };

  await dbConnect();

  const StockMetaData = await StockMetaDataModel.find(
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
