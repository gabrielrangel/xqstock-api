import { Schema, model, models } from "mongoose";

export const StockTimeSerieSchema = new Schema({
  open: { type: String, required: true },
  high: { type: String, required: true },
  low: { type: String, required: true },
  close: { type: String, required: true },
  volume: { type: String, required: true },
});

export default models.StockTimeSerie ||
  model("StockTimeSerie", StockTimeSerieSchema);
