"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ActionButton from "../ui/ActionButton";
import { montserrat } from "@/styles/fonts";
import Logo from "../ui/Logo";

type TSignIn = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: TSignIn) {
  return (
    <div className="mx-auto text-center">
      <Logo className="mt-20" />
      <p className="mb-4">로그인 후 서비스 이용가능 합니다.</p>
      {Object.values(providers).map(({ id, name }) => (
        <ActionButton
          key={id}
          text={`Sign in with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          wide
        />
      ))}
    </div>
  );
}
