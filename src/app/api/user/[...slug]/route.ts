import { authOptions } from "@/app/lib/options";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

type TContext = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: TContext) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  // get record collection
  // return getListById(user.id, context.params.id) //
  //   .then((data) => NextResponse.json(data));
}
