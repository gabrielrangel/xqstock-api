export default function getEnv() {
  const {
    ALPHA_ADVANTAGE_API_KEY: API_KEY,
    ALPHA_ADVANTAGE_BASE_URI: BASE_URI,
  }: Record<string, string | undefined> = process.env;

  if (!API_KEY) {
    throw new Error("Missing ALPHA_ADVANTAGE_API_KEY environment variable.");
  }

  if (!BASE_URI) {
    throw new Error("Missing ALPHA_ADVANTAGE_BASE_URI environment variable.");
  }

  return { API_KEY, BASE_URI };
}
