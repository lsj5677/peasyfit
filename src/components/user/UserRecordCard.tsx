import { TRecord } from "@/app/service/list.firestore";
import Link from "next/link";
import { useState } from "react";
import {
  TEmptyRecord,
  TExistingRecord,
  TUserRecordAll,
} from "./UserRecordGrid";

type TUserRecordCard = {
  record: TEmptyRecord | TExistingRecord;
  listId: string;
};

export default function UserRecordCard({ record, listId }: TUserRecordCard) {
  const { userId } = record;
  console.log("record", record, "list", listId);

  const filteredList = Object.entries(record).filter(([_, value]) => value);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
            {/* {filteredList.map((item, index) => (
              <li key={`list${index}`} className="my-1 text-base font-semibold">
                💪🏻 {item}
              </li>
            ))} */}
            {/* {userId === "none" &&
              filteredList.map((item, index) => (
                <li
                  key={`list${index}`}
                  className="my-1 text-base font-semibold"
                >
                  💪🏻 {item}
                </li>
              ))} */}
          </ul>
          <div className="card-actions">
            <Link
              href={`/record/${""}`}
              className="btn bg-subOrange hover:bg-mainOrange flex w-full items-center justify-center text-base text-black"
            >
              기록보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
