"use client";

import { TUserList } from "@/app/service/list.firestore";
import useSWR from "swr";
import UserListCard from "./UserListCard";

export default function UserList() {
  const { data: lists, error, isLoading } = useSWR<TUserList[]>(`/api/list`);

  return (
    <div>
      <h2 className="my-5 text-center text-lg font-semibold">
        내 저장목록 {lists?.length ?? 0}개
      </h2>
      <ul className="grid gap-3 md:grid-cols-2">
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
