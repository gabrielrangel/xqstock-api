import dbConnect from "@api/lib/dbConnect";
import SessionModel from "@api/Models/Session";

export async function getSession(id: string) {
  await dbConnect();

  return SessionModel.findOne({ _id: id })
    .exec()
    .catch((e) => {
      if (e.kind === "ObjectId") {
        return null;
      }
    });
}

export default getSession;
