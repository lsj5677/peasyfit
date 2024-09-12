import { authOptions } from "@/app/lib/options";
import { addList, getAllMyList } from "@/app/service/list.firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { id } = user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const body = await req.json();
  const { newList } = body;

  if (user && id) {
    return addList(id, newList).then((data) => NextResponse.json(data));
  } else {
    return new Response("Bad Request", { status: 400 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getAllMyList(user.id) //
    .then((data) => NextResponse.json(data));
}
