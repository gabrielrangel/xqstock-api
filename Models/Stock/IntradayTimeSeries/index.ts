import { Schema, model, models } from "mongoose";
import { IStockIntradayTimeSerie } from "./types";

export const StockIntradayTimeSerieSchema = new Schema<IStockIntradayTimeSerie>({
  symbol: { type: String, required: true, unique: true },

  timeSeries: {
    type: [
      {
        date: { type: Date, required: true },
        open: { type: String, required: true },
        high: { type: String, required: true },
        low: { type: String, required: true },
        close: { type: String, required: true },
        volume: { type: String, required: true },
      },
    ],
    required: true,
  },
});

export default models.IntradayTimeSerieSchema ||
  model("StockIntradayTimeSerie", StockIntradayTimeSerieSchema);
 