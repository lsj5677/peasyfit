"use client";

import { TUserList } from "@/app/service/list.firestore";
import useSWR from "swr";
import UserListCard from "./UserListCard";
import { FaCircleExclamation } from "react-icons/fa6";

export default function UserListGrid() {
  const { data: lists, error, isLoading } = useSWR<TUserList[]>(`/api/list`);

  return (
    <div>
      <div role="alert" className="alert bg-subPurple my-5 text-white">
        <FaCircleExclamation />
        <span>현재 저장목록 {lists?.length ?? 0}개</span>
        <span className="text-sm">리스트는 최대 4개까지 저장 가능합니다. </span>
      </div>

      {isLoading && (
        <span className="loading loading-dots loading-lg mx-auto my-20 block"></span>
      )}
      <ul className="grid gap-3 md:grid-cols-2">
        {lists &&
          lists.map((list, index) => (
            <li key={index}>
              <UserListCard list={list} />
            </li>
          ))}
      </ul>
    </div>
  );
}
