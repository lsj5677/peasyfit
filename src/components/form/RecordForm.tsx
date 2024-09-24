"use client";

import { TUserList } from "@/app/service/list.firestore";
import { ChangeEvent, FormEvent, useState } from "react";
import useSWR from "swr";
import ActionButton from "../ui/ActionButton";
import { useRouter } from "next/navigation";

type TRecordForm = {
  recordId: string;
};

export default function RecordForm({ recordId }: TRecordForm) {
  const [record, setRecord] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { data, isLoading, error } = useSWR<TUserList>(`/api/list/${recordId}`);

  if (!data) return;

  const { list, userId, id: listId } = data;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target;
    const pattern = /^(\d{1,3})(\.\d{0,2})?$/;

    if (pattern.test(value) || value === "") {
      setRecord((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (record === null) return;

    fetch("/api/record/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ record, listId }),
    }) //
      .then((res) => {
        if (res.ok) {
          alert("성공적으로 저장되었습니다.");
          return { userId };
        } else {
          alert("오류가 발생했습니다");
          console.log(`${res.status} | ${res.statusText}`);
          return false;
        }
      })
      .then((userId) => {
        if (userId) {
          router.push(`/user/${userId}`);
        } else {
          alert("오류가 발생했습니다");
          router.push("/");
        }
      })
      .catch((err) => console.log(err.toString()))
      .finally(() => {});
  };

  const filteredList = Object.entries(list).filter(([_, value]) => value);

  return (
    <div className="sub-wrap">
      {isLoading && (
        <div className="absolute inset-0 left-1/2 z-20 w-full max-w-screen-md -translate-x-1/2 bg-gray-300/20 pt-[30%] text-center">
          <span className="loading loading-infinity w-12"></span>
        </div>
      )}
      {error && (
        <p className="mb-4 w-full bg-red-100 p-4 text-center font-bold text-red-700">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <ul className="flex flex-col gap-4">
          {filteredList.map(([key, _], index) => (
            <li key={index}>
              <label className="input input-bordered flex items-center gap-2 bg-subYellow">
                <span className="font-semibold">{key}</span>
                <input
                  type="number"
                  className="grow"
                  step="0.01"
                  pattern="[0-9]+"
                  placeholder="시간 또는 갯수입력"
                  onChange={(e) => handleChange(e, `${key}`)}
                  value={record[key] || ""}
                  required
                />
              </label>
            </li>
          ))}
        </ul>
        <ActionButton
          wide
          text="기록 저장하기"
          className="mx-auto mt-10 block text-base"
        />
      </form>
    </div>
  );
}
