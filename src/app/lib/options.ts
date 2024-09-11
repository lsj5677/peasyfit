import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { addUser } from "../service/user.firestore";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email) return false;

      addUser({
        id,
        name: name || "",
        image,
        email,
        username: email?.split("@")[0],
      });

      return true;
    },
    async session({ session }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] || "",
        };
      }
      return session;
    },
  },
};
