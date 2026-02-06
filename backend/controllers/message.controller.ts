import type { Request, Response } from "express";
import { messages, type Message } from "../data/message.store";

type Params = { id: string };
type Body = { message?: string };

export const getMessages = (req: Request<Params>, res: Response) => {
  const chatId = req.params.id;
  res.json(messages[chatId] ?? []);
};

export const sendMessages = (req: Request<Params>, res: Response) => {
  const chatId = req.params.id;
  if (!messages[chatId]) {
    messages[chatId] = [];
  }

  // Text message
  if (req.body?.message) {
    const userText: Message = {
      id: Date.now().toString(),
      role: "user",
      type: "text",
      content: req.body.message,
    };
    messages[chatId].push(userText);
  }

  // Image Message
  if (req.file) {
    const userImage: Message = {
      id: Date.now().toString(),
      role: "user",
      type: "image",
      base64: req.file.buffer.toString("base64"),
    };

    messages[chatId].push(userImage);
  }
  // assistant response
  const assistantReply: Message = {
    id: (Date.now() + 1).toString(),
    role: "assistant",
    type: "text",
    content: "YES",
  };

  messages[chatId].push(assistantReply);

  res.status(201).json({ success: true });
};
