import { getUser } from "@/app/service/user.firestore";
import UserListGrid from "@/components/user/UserListGrid";
import UserProfile from "@/components/user/UserProfile";
import { notFound } from "next/navigation";
import { cache } from "react";

type TUser = {
  params: { id: string };
};

// user 받아와서 동일한 사용자에게는 캐시된 결과 사용하도록
const getUserfromFirestore = cache(async (id: string) => getUser(id));

export default async function UserPage({ params: { id } }: TUser) {
  const user = await getUserfromFirestore(id);

  if (!user) notFound();

  return (
    <div className="p-4">
      <UserProfile user={user} />
      <UserListGrid />
    </div>
  );
}
