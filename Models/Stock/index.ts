import { StockTimeSerieSchema } from "./TimeSerie";
import { StockMetadataSchema } from "./MetaData";
import { Schema, model, models } from "mongoose";

const StockSchema = new Schema({
  MetaData: { type: StockMetadataSchema, required: true },
  TimeSeries: { type: [StockTimeSerieSchema], required: true },
});

export default models.Stock || model("Stock", StockSchema);
