"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

export const useSendMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      text,
      file,
    }: {
      text?: string;
      file?: File;
    }) => {
      const formData = new FormData();

      if (text) formData.append("message", text);
      if (file) formData.append("file", file);

      await api.post(`/chats/${chatId}/messages`, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", chatId],
      });
    },
  });
};
