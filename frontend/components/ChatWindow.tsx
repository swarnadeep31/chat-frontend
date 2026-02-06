"use client";

import { useMessages } from "@/hooks/useMessages";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ChatSidebar } from "./ChatSidebar";
import { useState } from "react";

type ChatSession = {
  id: string;
  title: string;
};

export const ChatWindow = () => {
  const [chats, setChats] = useState<ChatSession[]>([
    { id: "1", title: "New chat" },
  ]);

  const [activeChatId, setActiveChatId] = useState("1");
  const { data } = useMessages(activeChatId);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-72 border-r bg-white">
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          setActiveChatId={setActiveChatId}
          setChats={setChats}
        />
      </div>

      {/* Chat column */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {data?.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <div className="text-sm text-gray-400 animate-pulse">
              Assistant is typing…
            </div>
          )}
        </div>

        <div className="border-t bg-white px-4 py-3">
          <MessageInput
            chatId={activeChatId}
            setIsTyping={setIsTyping}
            setChats={setChats}
          />
        </div>
      </div>
    </div>
  );
};
