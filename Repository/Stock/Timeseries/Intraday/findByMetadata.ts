import getIntradayTimeSeriesRecursively from "@api/Services/Stock/getIntradayTimeSeriesRecursively";
import { IStockTimeSerie } from "@api/Models/Stock/TimeSeries";
import { Query } from "mongoose";
import { IMetadata } from "@lib/AlphaAdvantageApi";

export default function findByMetadata(
  metadata: Partial<IMetadata>
): Promise<Query<IStockTimeSerie[], IStockTimeSerie, {}, IStockTimeSerie>> {
  return getIntradayTimeSeriesRecursively(metadata);
}
