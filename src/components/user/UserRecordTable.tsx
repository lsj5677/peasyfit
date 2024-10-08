"use client";

import { useMemo } from "react";
import { TUserRecordAll } from "./UserRecordGrid";
import { parseDate } from "@/utils/parseDate";

type TUserRecordChart = {
  filteredRecords: TUserRecordAll[];
};

export default function UserRecordTable({ filteredRecords }: TUserRecordChart) {
  const groupedRecordsByKey = useMemo(() => {
    return filteredRecords.reduce(
      (acc, { records: data }) => {
        data.forEach(({ record, createdAt }) => {
          // record의 각 key-value 쌍을 순회
          Object.entries(record).forEach(([key, value]) => {
            // acc[key]가 없으면 빈 배열로 초기화
            if (!acc[key]) {
              acc[key] = [];
            }

            // createdAt을 원하는 형식으로 변환
            const formattedCreatedAt = createdAt
              ? new Date(createdAt).toLocaleDateString("ko-KR") // 한국어 형식으로 변환
              : "알 수 없는 날짜";

            // 동일한 key에 대해 value와 formattedCreatedAt 저장
            acc[key].push({
              value,
              createdAt: formattedCreatedAt || "알 수 없는 날짜",
            });
          });
        });

        return acc; // 누적값 반환
      },
      {} as Record<string, { value: string | number; createdAt: string }[]>,
    );
  }, [filteredRecords]);

  return (
    <section>
      {Object.entries(groupedRecordsByKey).map(([key, values]) => (
        <div key={key} className="my-10">
          <h3 className="rounded-t-md bg-subPurple px-4 py-2 font-semibold text-white">
            {key}
          </h3>
          <div>
            <div className="flex basis-1/5 items-center justify-between">
              {values.map((item, index) => (
                <ul key={index} className="flex w-full flex-col text-center">
                  <li className="box-border w-full border border-neutral-300 bg-neutral-200 py-2">
                    {parseDate(item.createdAt)}
                  </li>
                  <li className="box-border border py-2">{item.value}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
