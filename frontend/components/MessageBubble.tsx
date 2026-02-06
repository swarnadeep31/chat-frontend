"use client";


import { Message } from "@/types/messages";
import clsx from "clsx";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={clsx("flex", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={clsx(
          "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
          isUser
            ? "bg-green-100 text-gray-900"
            : "bg-gray-100 text-gray-900"
        )}
      >
        {message.type === "text" ? (
          message.content
        ) : (
          <img
            src={`data:image/png;base64,${message.base64}`}
            className="rounded-lg max-w-full"
          />
        )}
      </div>
    </div>
  );
};
