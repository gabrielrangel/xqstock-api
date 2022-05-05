import { StockMetaDataModel } from "@api/Models/Stock/Metadata";
import findOneBySymbol from "./findOneBySymbol";
export * from "./findOneBySymbol";

const {
  deleteMany,
  deleteOne,
  find,
  findById,
  findByIdAndDelete,
  findByIdAndRemove,
  findByIdAndUpdate,
  findOne,
  findOneAndDelete,
  findOneAndRemove,
  findOneAndReplace,
  findOneAndUpdate,
  replaceOne,
  updateMany,
  updateOne,
} = StockMetaDataModel;

export const MetadataRepository = {
  deleteMany,
  deleteOne,
  find,
  findById,
  findByIdAndDelete,
  findByIdAndRemove,
  findByIdAndUpdate,
  findOne,
  findOneAndDelete,
  findOneAndRemove,
  findOneAndReplace,
  findOneAndUpdate,
  replaceOne,
  updateMany,
  updateOne,
  findOneBySymbol,
};

export default MetadataRepository;
