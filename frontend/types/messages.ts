export type TextMessage = {
  id: string;
  role: "user" | "assistant";
  type: "text";
  content: string;
};

export type ImageMessage = {
  id: string;
  role: "user" | "assistant";
  type: "image";
  base64: string;
};

export type Message = TextMessage | ImageMessage;
