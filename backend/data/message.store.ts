export type Message =
  | {
      id: string;
      role: "user" | "assistant";
      type: "text";
      content: string
    }
  | {
      id: string;
      role: "user" | "assistant";
      type: "image";
      base64: string;
    };

export const messages: Record<string, Message[]> = {};
