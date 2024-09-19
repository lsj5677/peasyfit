import { authOptions } from "@/app/lib/options";
import { deleteListById, getListById } from "@/app/service/list.firestore";
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
  return getListById(user.id, context.params.id) //
    .then((data) => NextResponse.json(data));
}

export async function DELETE(_: NextRequest, context: TContext) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  try {
    await deleteListById(user.id, context.params.id);
    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    return new Response("Failed to delete record", { status: 500 });
  }
}
