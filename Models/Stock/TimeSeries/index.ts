import { ITimeSerie } from "@api/lib/AlphaAdvantageApi";
import { Document, Model, model, models, Schema } from "mongoose";
import { StockTimeSerieKindEnum } from "./types";

export * from "./types";

export type StockTimeSerieSchemaType = ITimeSerie & {
  Symbol: string;
  Date: Date | string;
  Kind: StockTimeSerieKindEnum;
  Region: string;
};

export const StockTimeSerieSchema = new Schema<StockTimeSerieSchemaType>({
  Symbol: { type: String, required: true },
  Date: { type: Date, required: true },
  Open: { type: String, required: true },
  High: { type: String, required: true },
  Low: { type: String, required: true },
  Close: { type: String, required: true },
  Volume: { type: String, required: true },
  Region: { type: String, required: true },
  Kind: {
    type: String,
    enum: Object.values(StockTimeSerieKindEnum),
    required: true,
  },
});

StockTimeSerieSchema.index({ Symbol: 1, Date: 1, Kind: 1 }, { unique: true });

export type TStockTimeSeriesModel = Document<
  unknown,
  any,
  StockTimeSerieSchemaType
> &
  StockTimeSerieSchemaType;

export const StockTimeSerieModel: Model<StockTimeSerieSchemaType> =
  models.StockTimeSerie || model("StockTimeSerie", StockTimeSerieSchema);

export default StockTimeSerieModel;
