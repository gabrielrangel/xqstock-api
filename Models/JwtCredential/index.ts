import { IJwtCredential } from "./types";
import mongoose, { model, models } from "mongoose";

export const JwtCredentialSchema = new mongoose.Schema<IJwtCredential>({
  email: { type: String, required: true, unique: true },
  token: { type: String },
});

export const JwtCredentialModel =
  models.JwtCredential || model("JwtCredential", JwtCredentialSchema);

export default JwtCredentialModel;
