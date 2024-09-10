import { authOptions } from "@/app/lib/options";
import SignIn from "@/components/auth/SignIn";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return <SignIn providers={providers} />;
}
