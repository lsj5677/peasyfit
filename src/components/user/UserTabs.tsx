"use client";

import { useState } from "react";
import UserListGrid from "./UserListGrid";
import UserRecordGrid from "./UserRecordGrid";

const tabs = [
  {
    type: "list",
    title: "My List",
  },
  {
    type: "record",
    title: "Record",
  },
];

export default function UserTabs() {
  const [tab, setTab] = useState<string>(tabs[0].type);

  return (
    <div className="my-10">
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
            className={`flex basis-1/2 cursor-pointer items-center justify-center gap-2 border-black p-4 text-base ${type === tab && "bg-mainPurple rounded-2xl font-bold text-white"}`}
          >
            <button aria-label={title}>{title}</button>
          </li>
        ))}
      </ul>

      {/* 각 클릭된 것에 따라 컴포넌트 호출 */}
      {tab === "record" ? <UserRecordGrid /> : <UserListGrid />}
    </div>
  );
}
