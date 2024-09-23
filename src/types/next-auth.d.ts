import { TOAuthUser } from "@/app/service/user.firestore";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: TOAuthUser;
  }
}

const _nextAuth = NextAuth;
