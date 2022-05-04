import { IStockMetaData } from "@api/Models/Stock/MetaData";
import AlphaAdvantageApi from "@lib/AlphaAdvantageApi";
import StockIntradayTimeSeriesModel from "@api/Models/Stock/IntradayTimeSeries";
import dbConnect from "@lib/dbConnect";
import normalizeAlphaAdvantageObjKeys from "@lib/AlphaAdvantageApi/util/normalizeAlphaAdvantageObjKeys";
import { QueryWithHelpers, FilterQuery } from "mongoose";
import { IStockIntradayTimeSerie } from "@api/Models/Stock/IntradayTimeSeries/types";

export default async function getIntradayTimeSeriesRecursively(
  { symbol }: IStockMetaData,
  filter: FilterQuery<IStockIntradayTimeSerie>
): Promise<
  QueryWithHelpers<IStockIntradayTimeSerie[], IStockIntradayTimeSerie>
> {
  await dbConnect();

  const StockIntradayTimeSeries = await StockIntradayTimeSeriesModel.find(
    Object.assign(filter, { symbol })
  ).exec();

  if (StockIntradayTimeSeries) {
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
      StockIntradayTimeSeriesModel.create(Object.assign(timeserie, { symbol }))
    )
  );

  return StockIntradayTimeSeriesModel.find(Object.assign(filter, { symbol }));
}
