"use client";

import { DocumentData } from "@firebase/firestore";
import ActionButton from "../ui/ActionButton";
import { signOut } from "next-auth/react";

export default function UserProfile({ user }: DocumentData) {
  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      signOut({
        callbackUrl: "/",
      });
    }
  };
  return (
    <div className="border-b border-neutral-300 pb-4">
      <div className="chat chat-start">
        <div className="chat-image">
          <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-mainPurple text-center font-black text-white">
            <span>PE</span>
          </div>
        </div>
        <div className="chat-header text-sm">PEasyFit</div>
        <div className="chat-bubble">
          <strong>@{user.username}</strong>님! 오늘도 힘내세요 😁 <br />
          로그아웃을 원하시면 아래 버튼을 눌러주세요 😁
        </div>
        <div className="chat-footer text-xs opacity-40">Delivered</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image">
          <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-mainPurple text-center font-black text-white">
            <span>PE</span>
          </div>
        </div>
        <div className="chat-header text-sm">PEasyFit</div>
        <div className="chat-bubble">
          <ActionButton text="Logout" onClick={logout} />
        </div>
        <div className="chat-footer text-xs opacity-40">Delivered</div>
      </div>
    </div>
  );
}
