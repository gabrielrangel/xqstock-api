import removeBookmarkService from "@api/Services/Session/removeBookmark";

export async function addBookmark(sessionId: string, symbol: string) {
  return removeBookmarkService(sessionId, symbol);
}

export default addBookmark;
