import { TimeSeriesRepository } from "../index";
import { IStockTimeSerie } from "@api/Models/Stock/TimeSeries";
import { FilterQuery } from "mongoose";

export function findOldest(filter: FilterQuery<IStockTimeSerie> = {}) {
  Object.assign(filter, {
    Kind: "intraday",
  } as FilterQuery<IStockTimeSerie>);

  return TimeSeriesRepository.findOldest(filter);
}

export default findOldest;
