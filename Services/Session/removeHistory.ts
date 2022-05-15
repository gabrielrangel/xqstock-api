import dbConnect from "@api/lib/dbConnect";
import SessionRepository from "@api/Repository/Session";
import removeBookmark from "@api/Services/Session/removeBookmark";

export async function removeHistory(sessionId: string, symbol: string) {
  await dbConnect();

  const session = await SessionRepository.findOneById(sessionId);

  if (session) {
    session.SymbolHistory = session.SymbolHistory.filter(
      (item) => item != symbol
    );

    await session.save();
  }

  await removeBookmark(sessionId, symbol);
}

export default removeHistory;
