import StockTimeSerieModel, {
  IStockTimeSerie,
} from "@api/Models/Stock/TimeSeries";
import dbConnect from "@api/lib/dbConnect";

import { FilterQuery, Query } from "mongoose";

export async function findOldest(
  filter: FilterQuery<IStockTimeSerie> = {}
): Promise<Query<IStockTimeSerie, IStockTimeSerie> | IStockTimeSerie> {
  await dbConnect();
  return StockTimeSerieModel.findOne(filter).sort({ Date: 1 });
}

export default findOldest;
