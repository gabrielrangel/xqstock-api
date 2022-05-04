import { Schema, models, model } from "mongoose";
import { IStockMetaData } from "./types";

export * from "./types";

export const StockMetadataSchema = new Schema<IStockMetaData>({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  region: { type: String, required: true },
  currency: { type: String, required: true },
});

export default models.StockMetadata ||
  model("StockMetadata", StockMetadataSchema);
