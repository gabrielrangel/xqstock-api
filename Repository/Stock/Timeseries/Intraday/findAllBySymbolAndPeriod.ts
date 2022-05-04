import { IStockMetaData } from "@api/Models/Stock/MetaData";
import getIntradayTimeSeriesRecursively from "@api/Services/Stock/getIntradayTimeSeriesRecursively";
import { IStockTimeSerie } from "@api/Models/Stock/TimeSeries";
import { Query } from "mongoose";

export default function findAllBySymbolAndPeriod(
  metadata: IStockMetaData,
  startDate: string,
  endDate: string
): Promise<Query<IStockTimeSerie[], IStockTimeSerie, {}, IStockTimeSerie>> {
  console.log({ startDate, endDate });
  return getIntradayTimeSeriesRecursively(metadata, {
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  });
}
