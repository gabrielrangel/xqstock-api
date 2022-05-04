import { IStockMetaData } from "@api/Models/Stock/MetaData";
import getIntradayTimeSeriesRecursively from "@api/Services/Stock/getIntradayTimeSeriesRecursively";
import { IStockTimeSerie } from "@api/Models/Stock/TimeSeries";
import { Query } from "mongoose";

export default function findAllBySymbol(
  metadata: IStockMetaData
): Promise<Query<IStockTimeSerie[], IStockTimeSerie, {}, IStockTimeSerie>> {
  return getIntradayTimeSeriesRecursively(metadata, {});
}
