"use client";

import { useState } from "react";
import UserRecordChart from "./UserRecordChart";
import UserRecordTable from "./UserRecordTable";
import useSWR from "swr";
import { TUserRecordAll } from "./UserRecordGrid";
import { useParams } from "next/navigation";
import { FaCircleExclamation } from "react-icons/fa6";

const tabs = [
  {
    type: "table",
    title: "표로 보기",
  },
  {
    type: "graph",
    title: "그래프 비교",
  },
];

export default function UserRecordChartGrid() {
  const { data: records, isLoading } = useSWR<TUserRecordAll[]>(`/api/record`);
  const { listId } = useParams();
  const [tab, setTab] = useState<string>(tabs[0].type);

  if (!records || records.length === 0) {
    return <p>리스트가 없습니다.</p>;
  }

  const filteredRecords = records.filter((record) => record.listId === listId);

  return (
    <div className="sub-wrap my-10">
      {/* 탭구현 */}
      <ul
        className="mb-10 flex justify-between rounded-2xl bg-neutral-300 uppercase"
        role="tablist"
      >
        {tabs.map(({ type, title }) => (
          <li
            key={type}
            role="tab"
            onClick={() => setTab(type)}
            className={`flex basis-1/2 cursor-pointer items-center justify-center gap-2 border-black p-4 text-base ${type === tab && "rounded-2xl bg-mainPurple font-bold text-white"}`}
          >
            <button aria-label={title}>{title}</button>
          </li>
        ))}
      </ul>

      <div role="alert" className="alert my-5 bg-mainPurple text-white">
        <FaCircleExclamation />
        <span>최근 저장한 기록 5개만 보여집니다.</span>
      </div>

      {isLoading && (
        <div className="absolute inset-0 left-1/2 z-20 w-full max-w-screen-md -translate-x-1/2 bg-gray-300/20 pt-[30%] text-center">
          <span className="loading loading-infinity w-12"></span>
        </div>
      )}
      {!records || (records.length === 0 && <p>리스트가 없습니다.</p>)}
      {/* 각 클릭된 것에 따라 컴포넌트 호출 */}
      {tab === "table" ? (
        <UserRecordTable filteredRecords={filteredRecords} />
      ) : (
        <UserRecordChart filteredRecords={filteredRecords} />
      )}
    </div>
  );
}
