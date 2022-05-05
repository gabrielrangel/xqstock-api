import getIntradayTimeSeriesRecursively from "@api/Services/Stock/getIntradayTimeSeriesRecursively";
import { IStockTimeSerie } from "@api/Models/Stock/TimeSeries";
import { Query } from "mongoose";
import { IMetadata } from "@lib/AlphaAdvantageApi";

export function findByMetadataAndPeriod(
  metadata: Partial<IMetadata>,
  startDate: string,
  endDate: string
): Promise<Query<IStockTimeSerie[], IStockTimeSerie, {}, IStockTimeSerie>> {
  return getIntradayTimeSeriesRecursively(
    metadata,
    new Date(startDate),
    new Date(endDate)
  );
}

export default findByMetadataAndPeriod;
