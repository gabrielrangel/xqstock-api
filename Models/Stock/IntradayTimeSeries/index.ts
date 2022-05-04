import { Schema, model, models } from "mongoose";
import { IStockIntradayTimeSerie } from "./types";

export const StockIntradayTimeSerieSchema = new Schema<IStockIntradayTimeSerie>({
  symbol: { type: String, required: true },
  date: { type: Date, required: true },
  open: { type: String, required: true },
  high: { type: String, required: true },
  low: { type: String, required: true },
  close: { type: String, required: true },
  volume: { type: String, required: true },
});

StockIntradayTimeSerieSchema.index({ symbol: 1, date: 1 }, { unique: true });

export default models.IntradayTimeSerieSchema ||
  model("StockIntradayTimeSerie", StockIntradayTimeSerieSchema);
