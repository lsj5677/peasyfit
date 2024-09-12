"use client";

import { TUserList } from "@/app/service/list.firestore";
import { DocumentData } from "@firebase/firestore";
import useSWR from "swr";
import UserListCard from "./UserListCard";

export default function UserList({ user }: DocumentData) {
  const { data: lists, error, isLoading } = useSWR<TUserList[]>(`/api/list`);
  console.log(`client data`, lists);

  return (
    <div>
      userList
      <ul className="grid grid-cols-1 content-stretch gap-6 py-6 md:grid-cols-2">
        {lists &&
          lists.map((list, index) => (
            <li
              key={index}
              className="bg-subYellow w-full rounded-md p-5 shadow-xl"
            >
              <UserListCard list={list} />
            </li>
          ))}
      </ul>
    </div>
  );
}
