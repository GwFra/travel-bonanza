import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "database",
  },
  adapter: DrizzleAdapter(db),
  providers: [Google],
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
  },
});
