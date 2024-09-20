"use client";

import useSWR from "swr";
import UserRecordCard from "./UserRecordCard";
import { FaCircleExclamation } from "react-icons/fa6";
import { Timestamp } from "@firebase/firestore";

// 데이터가 없는 경우의 타입
export type TEmptyRecord = {
  userId: string;
  record: Record<string, boolean>;
  createdAt?: string;
};

// 데이터가 있는 경우의 타입
export type TExistingRecord = {
  userId: string;
  createdAt?: string;
  record: Record<string, string | number>;
};

export type TUserRecordAll = {
  createdAt?: string;
  listId: string;
  userId: string;
  records: Array<TEmptyRecord | TExistingRecord>;
};

export default function UserRecordGrid() {
  const { data, error, isLoading } = useSWR<TUserRecordAll[]>(`/api/record`);

  return (
    <section>
      <div role="alert" className="alert bg-mainPurple my-5 text-white">
        <FaCircleExclamation />
        <span>각 리스트의 가장 최근 기록만 보여집니다. </span>
      </div>
      {isLoading && (
        <span className="loading loading-dots loading-lg mx-auto my-20 block"></span>
      )}
      <ul className="grid gap-3 md:grid-cols-2">
        {data &&
          data.map(({ listId, records }, index) => (
            <li key={index}>
              {records.length > 0 ? (
                <UserRecordCard record={records[0]} listId={listId} />
              ) : (
                <p>기록이 없습니다.</p>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}
