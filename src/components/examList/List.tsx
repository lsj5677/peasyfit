"use client";

import { TList } from "@/app/service/list";
import { ChangeEvent, FormEvent, useState } from "react";
import ActionButton from "../ui/ActionButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  list: TList[];
};

export default function List({ list }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const [newList, setNewList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setNewList({
      ...newList,
      [name]: checked,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newList.length === 0) return;

    setLoading(true);

    // fetch api
    fetch("/api/list/", {
      method: "POST",
      body: JSON.stringify({ newList }),
    }) //
      .then((res) => {
        if (res.ok) {
          alert("성공적으로 저장되었습니다.");
        } else {
          setError(`${res.status} | ${res.statusText}`);
        }

        router.push(`/user/${user.id}`);
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <div>
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
      <form onSubmit={handleSubmit}>
        <ul>
          {list.map(({ name, description }) => (
            <li
              className="form-control border-b border-b-gray-200 p-4"
              key={name}
            >
              <label className="flex cursor-pointer items-center gap-5">
                <input
                  type="checkbox"
                  className="checkbox"
                  name={name}
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <span className="text-base font-bold">{name}</span>
                  <div className="text-sm opacity-50">{description}</div>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className="mx-auto my-10 text-center">
          <ActionButton
            wide
            text="나만의 리스트 만들기"
            className="text-base"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
}
