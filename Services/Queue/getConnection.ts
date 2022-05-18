const { REDIS_HOST, REDIS_PORT } = process.env;

if (!REDIS_HOST) {
  throw new Error("Missing REDIS_HOST environment variable");
}
if (!REDIS_PORT) {
  throw new Error("Missing REDIS_PORT environment variable");
}

export const host = REDIS_HOST;
export const port = REDIS_PORT;

export default () => ({
  host,
  port,
});
