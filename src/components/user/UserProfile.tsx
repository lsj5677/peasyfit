import { DocumentData } from "@firebase/firestore";

export default function UserProfile({ user }: DocumentData) {
  return (
    <div>
      <div className="chat chat-start border-b border-neutral-300 pb-4">
        <div className="chat-image">
          <div className="bg-mainPurple flex h-10 w-10 flex-col items-center justify-center rounded-full text-center font-black text-white">
            <span>PE</span>
          </div>
        </div>
        <div className="chat-header text-sm">PEasyFit</div>
        <div className="chat-bubble">
          @{user.username}님! 오늘도 힘내세요 😁
        </div>
        <div className="chat-footer text-xs opacity-40">Delivered</div>
      </div>
    </div>
  );
}
