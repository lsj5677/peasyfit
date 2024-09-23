import Link from "next/link";
import { useState } from "react";
import { TEmptyRecord, TExistingRecord } from "./UserRecordGrid";

type TUserRecordCard = {
  record: TEmptyRecord | TExistingRecord;
  listId: string;
};

const RecordDtatStyle =
  "my-1 flex items-center justify-between border-b border-neutral-300/30 py-2 text-base font-semibold";

const ButtonStyle =
  "btn bg-subOrange hover:bg-mainOrange flex w-full items-center justify-center text-base text-black";

export default function UserRecordCard({ record, listId }: TUserRecordCard) {
  const { userId, record: recordData } = record;

  const filteredList = Object.entries(recordData).filter(([_, value]) => value);

  const [loading, _setLoading] = useState<boolean>(false);
  const [error, _setError] = useState<string>("");
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
          {userId === "none" ? (
            <div>
              {filteredList.map(([key, _]) => (
                <ul className={RecordDtatStyle} key={key}>
                  <li>{key}</li>
                  <li>0</li>
                </ul>
              ))}
            </div>
          ) : (
            <div>
              {Object.entries(recordData).map(([key, value]) => (
                <ul className={RecordDtatStyle} key={key}>
                  <li>{key}</li>
                  <li>{value}</li>
                </ul>
              ))}
            </div>
          )}
          <div className="card-actions">
            {userId === "none" ? (
              <Link href={`/record/${listId}`} className={ButtonStyle}>
                기록하기
              </Link>
            ) : (
              <Link href={`/user/${userId}/${listId}`} className={ButtonStyle}>
                기록보기
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
