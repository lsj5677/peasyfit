import { TUserList } from "@/app/service/list.firestore";

type TUserListCard = {
  list: TUserList;
};

export default function UserListCard({ list }: TUserListCard) {
  console.log("card", list);
  const { list: examList } = list;

  const filteredList = Object.entries(examList).filter(([_, value]) => value);

  return (
    <div className="py-2">
      <ul>
        {filteredList.map((item, index) => (
          <li
            className="border-b border-neutral-200 py-2 text-base"
            key={`list${index}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
