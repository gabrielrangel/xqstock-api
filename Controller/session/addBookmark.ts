import addBookmarkService from "@api/Services/Session/addBookmark";

export async function addBookmark(sessionId: string, symbol: string) {
  return addBookmarkService(sessionId, symbol);
}

export default addBookmark;
