import { model, Model, models, Schema } from "mongoose";
import { ISession } from "@api/Models/Session/types";

export const SessionSchema = new Schema<ISession>({
  SymbolHistory: [String],
  SymbolBookmarks: [String],
});

export const SessionModel: Model<ISession> =
  models.Session || model("Session", SessionSchema);

export default SessionModel;
