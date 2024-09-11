"use client";

import { SessionProvider } from "next-auth/react";

type TAuthContext = {
  children: React.ReactNode;
};
export default function AuthContext({ children }: TAuthContext) {
  return <SessionProvider>{children}</SessionProvider>;
}
