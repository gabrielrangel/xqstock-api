import { ITimeSerie } from './../../lib/AlphaAdvantageApi/types/ITimeSerie';
import { StockTimeSerieKindEnum } from "@api/Models/Stock/TimeSeries/types";
import dbConnect from "@api/lib/dbConnect";
import { FilterQuery, QueryWithHelpers } from "mongoose";
import dateDiffInDays from "@api/util/DateUtils/dateDiffInDays";
import { DateUtils } from "@api/util/DateUtils";

import AlphaAdvantageApi, {
  IMetadataSymbolSearch,
} from "@api/lib/AlphaAdvantageApi";

import StockIntradayTimeSeriesModel, {
  IStockTimeSerie,
} from "@api/Models/Stock/TimeSeries";

export async function fetchAndPersistIntradayTimeSeries(
  { Symbol }: IMetadataSymbolSearch,
  endDate: Date = new Date(Date.now()),
  startDate?: Date
): Promise<QueryWithHelpers<IStockTimeSerie[], IStockTimeSerie>> {
  const extraObj = { Kind: StockTimeSerieKindEnum.INTRADAY, Symbol };

  const outputCount = startDate
    ? dateDiffInDays(DateUtils.getLastWeekday(), startDate)
    : Number.POSITIVE_INFINITY;

  const outputSize = outputCount < 100 ? "compact" : "full";

  const TimeSeries: ITimeSerie[] =
    await AlphaAdvantageApi.timeSeriesIntradayExtended(Symbol, outputSize).then(
      ({ TimeSeries: data }) =>
        Object.entries(data).map(([Date, timeSerie]) => {
          return Object.assign(timeSerie, { ...extraObj, Date });
        })
    );

  await dbConnect();

  await Promise.all(
    TimeSeries.map((timeserie) =>
      StockIntradayTimeSeriesModel.create(timeserie)
    )
  );

  const filter: FilterQuery<IStockTimeSerie> = {
    Kind: "intraday",
    Symbol,
    Date: {
      $lte: new Date(endDate),
    },
  };

  if (startDate) {
    filter.Date["$gte"] = new Date(startDate);
  }

  return StockIntradayTimeSeriesModel.find(filter);
}

export default fetchAndPersistIntradayTimeSeries;
