"use client";

import { TRecord } from "@/app/service/list.firestore";
import useSWR from "swr";
import UserRecordCard from "./UserRecordCard";

// 데이터가 없는 경우의 타입
export type TEmptyRecord = {
  userId: string;
  record: Record<string, boolean>;
};

// 데이터가 있는 경우의 타입
export type TExistingRecord = {
  userId: string;
  createdAt?: Date;
  record: Record<string, string | number>;
};

export type TUserRecordAll = {
  listId: string;
  userId: string;
  records: Array<TEmptyRecord | TExistingRecord>;
};

export default function UserRecordGrid() {
  const { data, error, isLoading } = useSWR<TUserRecordAll[]>(`/api/record`);
  console.log("data", data);

  // listId하고 data map 돌려서 그 중 records 0번째만 전달

  // table 보기, chart 보기 (탭구현 => swap)

  // 카드 -> 최근 데이터만 전달 가공 여기서?
  // 기본 -> 차트

  if (!data || data.length === 0) {
    return <p>리스트가 없습니다.</p>;
  }

  return (
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
  );
}
