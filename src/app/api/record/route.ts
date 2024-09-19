import { authOptions } from "@/app/lib/options";
import { addRecord, getListById } from "@/app/service/list.firestore";
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
  const { record, listId } = body;

  console.log(`body`, listId);

  if (record) {
    return addRecord(id, listId, record).then((data) =>
      NextResponse.json(data),
    );
  } else {
    return new Response("Bad Request", { status: 400 });
  }
}
