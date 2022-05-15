import dbConnect from "@api/lib/dbConnect";
import SessionRepository from "@api/Repository/Session";

export async function removeBookmark(sessionId: string, symbol: string) {
  await dbConnect();

  const session = await SessionRepository.findOneById(sessionId);

  if (session) {
    session.SymbolBookmarks = session.SymbolBookmarks.filter(
      (item) => item != symbol
    );

    await session.save();
  }
}

export default removeBookmark;
