import { getLastWeekday } from "@api/util/getLastWeekday";
import { StockTimeSerieKindEnum } from "@api/Models/Stock/TimeSeries/types";
import dbConnect from "@lib/dbConnect";
import { QueryWithHelpers } from "mongoose";
import TimeSeriesRepository from "@api/Repository/Stock/Timeseries";
import dateDiffInDays from "@api/util/DateUtils/dateDiffInDays";

import AlphaAdvantageApi, {
  IMetadataSymbolSearch,
} from "@lib/AlphaAdvantageApi";

import StockIntradayTimeSeriesModel, {
  IStockTimeSerie,
} from "@api/Models/Stock/TimeSeries";

export async function fetchAndPersistIntradayTimeSeries(
  { Symbol }: Partial<IMetadataSymbolSearch>,
  startDate: Date = null,
  endDate: Date = new Date(Date.now())
): Promise<QueryWithHelpers<IStockTimeSerie[], IStockTimeSerie>> {
  const extraObj = { Kind: StockTimeSerieKindEnum.INTRADAY };

  const outputCount = dateDiffInDays(getLastWeekday(), startDate);
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

  return TimeSeriesRepository.find({
    Kind: "intraday",
    Symbol,
    Date: {
      $leq: new Date(endDate),
      $geq: new Date(startDate),
    },
  });
}

export default fetchAndPersistIntradayTimeSeries;
