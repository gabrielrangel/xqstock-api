import SessionModel from "@api/Models/Session";
import dbConnect from "@api/lib/dbConnect";

export async function newSession() {
  await dbConnect();

  return SessionModel.create({
    SymbolHistory: [],
    SymbolBookmarks: [],
  });
}

export default newSession;
