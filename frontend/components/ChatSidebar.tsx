"use client";

import clsx from "clsx";
import { Button } from "./ui/button";

type ChatSession = {
  id: string;
  title: string;
};

export const ChatSidebar = ({
  chats,
  activeChatId,
  setActiveChatId,
  setChats,
}: {
  chats: ChatSession[];
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}) => {
  const createNewChat = () => {
    const id = Date.now().toString();

    setChats((prev) => [
      { id, title: "New chat" },
      ...prev,
    ]);

    setActiveChatId(id);
  };

  return (
    <div className="flex h-full flex-col p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your chats</h2>

        <Button size="sm" onClick={createNewChat}>
          + New
        </Button>
      </div>

      {/* Chat list */}
      <div className="flex-1 space-y-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={clsx(
              "w-full rounded-lg px-3 py-2 text-left text-sm transition",
              activeChatId === chat.id
                ? "bg-violet-100 text-violet-700"
                : "hover:bg-gray-100 text-gray-700"
            )}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </div>
  );
};
