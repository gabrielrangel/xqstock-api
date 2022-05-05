import { StockTimeSerieKindEnum } from "@api/Models/Stock/TimeSeries/types";
import dbConnect from "@api/lib/dbConnect";
import { QueryWithHelpers } from "mongoose";
import dateDiffInDays from "@api/util/DateUtils/dateDiffInDays";
import { DateUtils } from "@api/util/DateUtils";

import AlphaAdvantageApi, {
  IMetadataSymbolSearch,
} from "@api/lib/AlphaAdvantageApi";

import StockIntradayTimeSeriesModel, {
  IStockTimeSerie,
} from "@api/Models/Stock/TimeSeries";

export async function fetchAndPersistIntradayTimeSeries(
  { Symbol }: Partial<IMetadataSymbolSearch>,
  startDate: Date = null,
  endDate: Date = new Date(Date.now())
): Promise<QueryWithHelpers<IStockTimeSerie[], IStockTimeSerie>> {
  const extraObj = { Kind: StockTimeSerieKindEnum.INTRADAY, Symbol };

  const outputCount = dateDiffInDays(DateUtils.getLastWeekday(), startDate);
  const outputSize = outputCount < 100 ? "compact" : "full";

  const TimeSeries: IStockTimeSerie[] =
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

  return StockIntradayTimeSeriesModel.find({
    Kind: "intraday",
    Symbol,
    Date: {
      $lte: new Date(endDate),
      $gte: new Date(startDate),
    },
  });
}

export default fetchAndPersistIntradayTimeSeries;
