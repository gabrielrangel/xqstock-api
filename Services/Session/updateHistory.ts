import dbConnect from "@api/lib/dbConnect";
import SessionRepository from "@api/Repository/Session";

export async function updateHistory(sessionId: string, symbol: string) {
  await dbConnect();

  const session = await SessionRepository.findOneById(sessionId);

  if (session) {
    session.SymbolHistory.push(symbol);
    session.SymbolHistory = session.SymbolHistory.sort();
    session.SymbolHistory = session.SymbolHistory.filter(
      (item, pos, ary) => !pos || item != ary[pos - 1]
    );
  }
}

export default updateHistory;
