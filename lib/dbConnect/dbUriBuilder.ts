export function dbUriBuilder(): string {
  const template =
    "mongodb://%MONGO_INITDB_ROOT_USERNAME%:%MONGO_INITDB_ROOT_PASSWORD%@%MONGO_INITDB_HOST%:%MONGO_INITDB_PORT%";

  const envList = template.match(/(?<=%{1})[\w_]+(?=%{1})/g);

  if (!envList) {
    throw new Error("Missing environment variables");
  }

  return envList.reduce((t, variable) => {
    const env = process.env[variable];

    if (!env) {
      throw new Error(
        `Missing environment variable for MongoDB connection. Either set MONGO_INITDB_URI or ${variable}`
      );
    }

    return t.replace(`%${variable}%`, env);
  }, template);
}

export default dbUriBuilder;
