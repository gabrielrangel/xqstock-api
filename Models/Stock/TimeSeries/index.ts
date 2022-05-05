import { ITimeSerie } from "@lib/AlphaAdvantageApi";
import { Schema, model, models } from "mongoose";
import { StockTimeSerieKindEnum } from "./types";

export * from "./types";

export interface IStockTimeSerie extends Partial<ITimeSerie> {
  Symbol: string;
  Date: Date;
  Kind: string;
}

export const StockTimeSerieSchema = new Schema<IStockTimeSerie>({
  Symbol: { type: String, required: true },
  Date: { type: Date, required: true },
  Open: { type: String, required: true },
  High: { type: String, required: true },
  Low: { type: String, required: true },
  Close: { type: String, required: true },
  Volume: { type: String, required: true },
  Kind: {
    type: String,
    enum: Object.values(StockTimeSerieKindEnum),
    required: true,
  },
});

StockTimeSerieSchema.index({ symbol: 1, date: 1, kind: 1 }, { unique: true });

export const StockTimeSerieModel =
  models.StockTimeSerie || model("StockTimeSerie", StockTimeSerieSchema);

export default StockTimeSerieModel;
