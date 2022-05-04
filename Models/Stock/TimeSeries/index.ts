import { Schema, model, models } from "mongoose";
import { IStockTimeSerie, StockTimeSerieKindEnum } from "./types";

export * from "./types";

export const StockTimeSeriSchema = new Schema<IStockTimeSerie>({
  symbol: { type: String, required: true },
  date: { type: Date, required: true },
  open: { type: String, required: true },
  high: { type: String, required: true },
  low: { type: String, required: true },
  close: { type: String, required: true },
  volume: { type: String, required: true },
  kind: {
    type: String,
    enum: Object.values(StockTimeSerieKindEnum),
    required: true,
  },
});

StockTimeSeriSchema.index({ symbol: 1, date: 1, kind: 1 }, { unique: true });

export default models.StockTimeSerie ||
  model("StockTimeSerie", StockTimeSeriSchema);
