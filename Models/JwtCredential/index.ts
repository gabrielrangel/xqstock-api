import { IJwtCredential } from "./types";
import mongoose, {Model, model, models} from "mongoose";

export const JwtCredentialSchema = new mongoose.Schema<IJwtCredential>({
  email: { type: String, required: true, unique: true },
  token: { type: String },
});

export const JwtCredentialModel: Model<IJwtCredential> =
  models.JwtCredential || model("JwtCredential", JwtCredentialSchema);

export default JwtCredentialModel;
