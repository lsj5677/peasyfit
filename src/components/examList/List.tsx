"use client";

import { TList } from "@/app/service/list";
import { ChangeEvent, FormEvent, useState } from "react";
import ActionButton from "../ui/ActionButton";

type Props = {
  list: TList[];
};

export default function List({ list }: Props) {
  const [newList, setNewList] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setNewList({
      ...newList,
      [name]: checked,
    });
  };
  const filteredList = Object.entries(newList).filter(([_, value]) => value);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newList.length === 0) return;
    alert(filteredList);

    // loading

    // fetch api
    fetch("/api/list/", {
      method: "POST",
      body: JSON.stringify({ newList }),
    }).then((res) => {
      if (!res.ok) {
        // setError(`${res.status} | ${res.statusText}`)]
        return;
      }
      if (res.ok) {
        alert("Data successfully saved to Firestore");
        setNewList([]);
      } else {
        alert("Error saving data");
      }

      // router.push('/')
    });
    // .catch((err) => )
    // .finally(() => )
  };

  return (
    <div>
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
