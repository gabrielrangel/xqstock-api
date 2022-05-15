import {AlphaAdvantageService} from "@api/Services/AlphaAdvantageService";
import dbConnect from "@api/lib/dbConnect";
import StockTimeSerieModel, {
  IStockTimeSerie,
} from "@api/Models/Stock/TimeSeries";
import {Query, FilterQuery} from "mongoose";
import {IStockMetaDataModel} from "@api/Models/Stock/Metadata";
import differenceInBusinessDays from 'date-fns/differenceInBusinessDays'

export async function findByMetadataAndPeriod(
  metadata: IStockMetaDataModel,
  endDate: string | Date,
  startDate?: string | Date
): Promise<Query<IStockTimeSerie[], IStockTimeSerie, {}, IStockTimeSerie>> {
  const {Symbol} = metadata;

  const filter: FilterQuery<IStockTimeSerie> = {
    Kind: "intraday",
    Symbol: Symbol.toUpperCase(),
    Date: {
      $lte: new Date(endDate),
    },
  };

  if (startDate) {
    filter.Date["$gte"] = new Date(startDate);
  }

  await dbConnect();

  const timeSeries = await StockTimeSerieModel.find(filter).exec();

  const curAndPevDatesList = timeSeries.map((ts, i, list) => ([ts.Date, list[--i]?.Date]))
  const dateDiff = curAndPevDatesList.map(([cur, prev]) => differenceInBusinessDays(  cur, prev ?? cur))
  const maxDateDiff = Math.max(...dateDiff);

  if (maxDateDiff > 1 || timeSeries.length === 0) {
    await AlphaAdvantageService.fetchAndPersistIntradayTimeSeries(
      metadata,
      new Date(endDate),
      startDate ? new Date(startDate) : undefined
    )
  }

  return StockTimeSerieModel.find(filter).exec();
}

export default findByMetadataAndPeriod;
