"use client";

import { signOut } from "next-auth/react";
import ActionButton from "../ui/ActionButton";

export default function List() {
  return (
    <div>
      <div>
        <ActionButton
          text="Signout"
          onClick={() => {
            if (window.confirm("로그아웃 하시겠습니까?")) {
              signOut();
            }
          }}
        />
      </div>
    </div>
  );
}
