import { StockTimeSerieKindEnum } from "./../../Models/Stock/TimeSeries/types";
import { IStockMetaData } from "@api/Models/Stock/MetaData";
import AlphaAdvantageApi from "@lib/AlphaAdvantageApi";
import StockIntradayTimeSeriesModel, {
  IStockTimeSerie,
} from "@api/Models/Stock/TimeSeries";
import dbConnect from "@lib/dbConnect";
import normalizeAlphaAdvantageObjKeys from "@lib/AlphaAdvantageApi/util/normalizeAlphaAdvantageObjKeys";
import { QueryWithHelpers, FilterQuery } from "mongoose";

export default async function getIntradayTimeSeriesRecursively(
  { symbol }: IStockMetaData,
  filter: FilterQuery<IStockTimeSerie> = {}
): Promise<QueryWithHelpers<IStockTimeSerie[], IStockTimeSerie>> {
  await dbConnect();

  Object.assign(filter, { symbol, kind: StockTimeSerieKindEnum.INTRADAY });

  const StockIntradayTimeSeries = await StockIntradayTimeSeriesModel.find(
    filter
  ).exec();

  if (StockIntradayTimeSeries.length) {
    return StockIntradayTimeSeries;
  }

  const { ["Time Series (Daily)"]: data } =
    await AlphaAdvantageApi().timeSeriesDaily(symbol, "full");

  const timeSeries = Object.entries(data).reduce(
    (acc, [date, dataObj]) => [
      ...acc,
      Object.assign(normalizeAlphaAdvantageObjKeys(dataObj), {
        date: new Date(date),
      }),
    ],
    []
  );

  await Promise.all(
    timeSeries.map((timeserie) =>
      StockIntradayTimeSeriesModel.create(
        Object.assign(timeserie, {
          symbol,
          kind: StockTimeSerieKindEnum.INTRADAY,
        })
      )
    )
  );

  return StockIntradayTimeSeriesModel.find(filter);
}
