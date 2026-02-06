"use client";

import { useSendMessage } from "@/hooks/useSendMessage";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImagePlus } from "lucide-react";

type ChatSession = {
  id: string;
  title: string;
};

export const MessageInput = ({
  chatId,
  setIsTyping,
  setChats,
}: {
  chatId: string;
  setIsTyping: (value: boolean) => void;
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useSendMessage(chatId);

  const send = () => {
    if (!text && !file) return;

    // Update chat title from first text
    if (text) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId && chat.title === "New chat"
            ? { ...chat, title: text.slice(0, 30) }
            : chat
        )
      );
    }

    setIsTyping(true);

    mutate(
      { text: text || undefined, file: file || undefined },
      {
        onSuccess: () => {
          setTimeout(() => setIsTyping(false), 800);
        },
      }
    );

    setText("");
    setFile(null);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Text input */}
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message AI…"
        className="flex-1 rounded-full px-4"
      />

      {/* Image icon button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
        className="rounded-full"
      >
        <ImagePlus className="h-5 w-5" />
      </Button>

      {/* Send button */}
      <Button
        onClick={send}
        disabled={isPending}
        className="rounded-full bg-violet-600 hover:bg-violet-700"
      >
        Send
      </Button>
    </div>
  );
};
