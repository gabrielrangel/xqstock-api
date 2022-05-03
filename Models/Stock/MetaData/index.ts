import { Schema, models, model } from "mongoose";
import { IStockMetaData } from "./types";

export const StockMetadataSchema = new Schema<IStockMetaData>({
  Information: { type: String, required: true },
  Symbol: { type: String, required: true },
  LastRefreshed: { type: String, required: true },
  Interval: { type: String, required: true },
  OutputSize: { type: String, required: true },
  TimeZone: { type: String, required: true },
});

export default models.StockMetadata ||
  model("StockMetadata", StockMetadataSchema);
