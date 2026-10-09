import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URL as string);
const db = client.db("Better_auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  // Email + password login (no email verification / reset, per assignment)
  emailAndPassword: {
    enabled: true,
    // Note: autoSignIn:false would make BetterAuth hide "email already exists"
    // errors (it returns a fake success). We keep autoSignIn on and sign the
    // user out on the client right after sign-up instead (see SignUpForm).
  },

  // Google + GitHub social login
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
