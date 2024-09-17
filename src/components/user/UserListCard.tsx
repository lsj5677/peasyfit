"use client";

import { TUserList } from "@/app/service/list.firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

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
            router.push(`/user/${userId}`);
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
        <div className="absolute inset-0 z-20 bg-sky-500/20 pt-[30%] text-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      )}
      {error && (
        <p className="mb-4 w-full bg-red-100 p-4 text-center font-bold text-red-700">
          {error}
        </p>
      )}
      <button
        onClick={handleDelete}
        className="ml-auto block text-3xl text-red-600"
      >
        <TiDeleteOutline />
      </button>
      <Link href={`/record/${listId}`} className="block h-full w-full">
        {filteredList.map((item, index) => (
          <div
            className="border-b border-neutral-200 py-2 text-base"
            key={`list${index}`}
          >
            <span>{item}</span>
          </div>
        ))}
      </Link>
    </div>
  );
}
