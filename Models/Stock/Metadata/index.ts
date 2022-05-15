import {IMetadataSymbolSearch} from "@api/lib/AlphaAdvantageApi/types/IMetadata";
import {Document, Model, model, models, Schema, Types} from "mongoose";

export type StockMetadataSchemaType = Omit<IMetadataSymbolSearch, "TimeZone" | "Marketopen" | "Marketclose" | "Matchscore">;

export const StockMetadataSchema = new Schema<StockMetadataSchemaType>({
  Symbol: {type: String, required: true, unique: true},
  Name: {type: String, required: true},
  Type: {type: String, required: true},
  Region: {type: String, required: true},
  Currency: {type: String, required: true},
});

StockMetadataSchema.index({Symbol: "text", Name: "text"})

export type TStockMetadataModel =
  Document<unknown, any, StockMetadataSchemaType> & StockMetadataSchemaType & { _id: Types.ObjectId }

export const StockMetaDataModel: Model<StockMetadataSchemaType> =
  models.StockMetadata || model("StockMetadata", StockMetadataSchema);

export default StockMetaDataModel;
