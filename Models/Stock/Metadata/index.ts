import { IMetadataSymbolSearch } from "@api/lib/AlphaAdvantageApi/types/IMetadata";
import { Schema, models, model } from "mongoose";

export const StockMetadataSchema = new Schema<Partial<IMetadataSymbolSearch>>({
  Symbol: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Region: { type: String, required: true },
  Currency: { type: String, required: true },
});

export const StockMetaDataModel =
  models.StockMetadata || model("StockMetadata", StockMetadataSchema);

export default StockMetaDataModel;
