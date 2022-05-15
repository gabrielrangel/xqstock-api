import findOneById from "@api/Repository/Session/findOneById";

export async function getSession(id: string) {
  return findOneById(id);
}

export default getSession;
