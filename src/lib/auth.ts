import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI?.trim();

  if (uri) {
    return uri;
  }

  const user = process.env.DB_USER?.trim();
  const password = process.env.DB_PASSWORD;
  const host = process.env.MONGODB_HOST?.trim();

  if (!user || !password || !host) {
    throw new Error(
      "MongoDB is not configured. Set MONGODB_URI, or set DB_USER, DB_PASSWORD, and MONGODB_HOST."
    );
  }

  const database = process.env.MONGODB_DB?.trim() || "news";

  return `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(
    password
  )}@${host}/${encodeURIComponent(
    database
  )}?retryWrites=true&w=majority`;
}

function getDatabaseName(uri: string): string {
  const configuredName = process.env.MONGODB_DB?.trim();

  if (configuredName) {
    return configuredName;
  }

  try {
    const databaseName = decodeURIComponent(
      new URL(uri).pathname.replace(/^\/+/, "")
    );

    if (databaseName) {
      return databaseName;
    }
  } catch {
    // Fall through to the explicit configuration error.
  }

  throw new Error(
    'MongoDB database name is missing. Include it in MONGODB_URI or set MONGODB_DB (for example, MONGODB_DB="news").'
  );
}

const globalForAuth = globalThis as typeof globalThis & {
  __banglaNewsMongoClient?: MongoClient;
  __banglaNewsAuth?: ReturnType<typeof createAuth>;
};

function createAuth() {
  const secret = process.env.BETTER_AUTH_SECRET?.trim();

  if (!secret || secret.length < 32) {
    throw new Error(
      "BETTER_AUTH_SECRET must be set and at least 32 characters long."
    );
  }

  const mongoUri = getMongoUri();
  const mongoClient =
    globalForAuth.__banglaNewsMongoClient ?? new MongoClient(mongoUri);

  if (process.env.NODE_ENV !== "production") {
    globalForAuth.__banglaNewsMongoClient = mongoClient;
  }

  return betterAuth({
    secret,
    baseURL: process.env.BETTER_AUTH_URL?.trim() || undefined,
    database: mongodbAdapter(mongoClient.db(getDatabaseName(mongoUri)), {
      client: mongoClient,
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
    },
  });
}

export const auth = globalForAuth.__banglaNewsAuth ?? createAuth();

if (process.env.NODE_ENV !== "production") {
  globalForAuth.__banglaNewsAuth = auth;
}
