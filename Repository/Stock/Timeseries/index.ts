import StockTimeSerieModel from "@api/Models/Stock/TimeSeries";
import { findOldest } from "./findOldest";
export * from "./Intraday";

const {
  deleteMany,
  deleteOne,
  find,
  findById,
  findByIdAndDelete,
  findByIdAndRemove,
  findByIdAndUpdate,
  findOne,
  findOneAndDelete,
  findOneAndRemove,
  findOneAndReplace,
  findOneAndUpdate,
  replaceOne,
  updateMany,
  updateOne,
} = StockTimeSerieModel;

export const TimeSeriesRepository = {
  deleteMany,
  deleteOne,
  find,
  findById,
  findByIdAndDelete,
  findByIdAndRemove,
  findByIdAndUpdate,
  findOne,
  findOneAndDelete,
  findOneAndRemove,
  findOneAndReplace,
  findOneAndUpdate,
  replaceOne,
  updateMany,
  updateOne,
  findOldest,
};

export default TimeSeriesRepository;
