export default function getEnv() {
  const API_KEY = process.env.ALPHA_ADVANTAGE_API_KEY
  if (!API_KEY) {
    throw new Error("Missing ALPHA_ADVANTAGE_API_KEY environment variable.");
  }

  const BASE_URI = process.env.ALPHA_ADVANTAGE_BASE_URI
  if (!BASE_URI) {
    throw new Error("Missing ALPHA_ADVANTAGE_BASE_URI environment variable.");
  }

  const MAX_REQ_PER_MIN = Number(process.env.ALPHA_ADVANTAGE_MAX_REQ_PER_MIN ?? 5)

  return {API_KEY, BASE_URI, MAX_REQ_PER_MIN};
}
