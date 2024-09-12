import { authOptions } from "@/app/lib/options";
import { getAllMyList } from "@/app/service/list.firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type TContext = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: TContext) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  console.log("list id", context);

  return getAllMyList(context.params.id) //
    .then((data) => NextResponse.json(data));
}
