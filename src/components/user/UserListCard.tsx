"use client";

import { TUserList } from "@/app/service/list.firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type TUserListCard = {
  list: TUserList;
};

export default function UserListCard({ list }: TUserListCard) {
  const { list: examList, id: listId, userId } = list;
  const filteredList = Object.entries(examList).filter(([_, value]) => value);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      fetch(`/api/list/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }) //
        .then((res) => {
          if (res.ok) {
            alert("삭제되었습니다.");
            if (userId) {
              router.push(`/user/${userId}`);
            }
          } else {
            setError(`${res.status} | ${res.statusText}`);
          }
        })
        .catch((err) => setError(err.toString()))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="h-full w-full py-2">
      {loading && (
        <div className="absolute inset-0 left-1/2 z-20 w-full max-w-screen-md -translate-x-1/2 bg-gray-300/20 pt-[30%] text-center">
          <span className="loading loading-infinity w-12"></span>
        </div>
      )}
      {error && (
        <p className="mb-4 w-full bg-red-100 p-4 text-center font-bold text-red-700">
          {error}
        </p>
      )}
      <div className="card bg-subPurple h-full">
        <div className="card-body justify-between text-center">
          <ul>
            {filteredList.map((item, index) => (
              <li key={`list${index}`} className="my-1 text-base font-semibold">
                💪🏻 {item}
              </li>
            ))}
          </ul>
          <div className="card-actions grid w-full grid-flow-row-dense grid-cols-3 gap-2">
            <button
              className="btn btn-ghost bg-mainPurple text-base"
              onClick={handleDelete}
            >
              삭제
            </button>
            <Link
              href={`/record/${listId}`}
              className="btn bg-subOrange hover:bg-mainOrange col-span-2 flex items-center justify-center text-base text-black"
            >
              기록하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
