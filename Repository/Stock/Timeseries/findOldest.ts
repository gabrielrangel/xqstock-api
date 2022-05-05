import { TimeSeriesRepository } from "./index";
import { IStockTimeSerie } from "@api/Models/Stock/TimeSeries";

import { FilterQuery, Query } from "mongoose";

export function findOldest(
  filter: FilterQuery<IStockTimeSerie> = {}
): Query<any, any, {}, any> {
  return TimeSeriesRepository.findOne(filter).sort({ Date: 1 });
}

export default findOldest;
