import dbConnect from "@api/lib/dbConnect";
import SessionRepository from "@api/Repository/Session";

export async function addBookmark(sessionId: string, symbol: string) {
  await dbConnect();

  const session = await SessionRepository.findOneById(sessionId);

  if (session) {
    session.SymbolBookmarks.push(symbol);
    session.SymbolBookmarks = session.SymbolBookmarks.sort();
    session.SymbolBookmarks = session.SymbolBookmarks.filter(
      (item, pos, ary) => !pos || item != ary[pos - 1]
    );

    await session.save();
  }
}

export default addBookmark;
