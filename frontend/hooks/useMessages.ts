"use client"

import { api } from "@/api/client"
import { Message } from "@/types/messages"
import { useQuery } from "@tanstack/react-query"

export const useMessages = (chatId: string) => {
    return useQuery<Message[]>({
        queryKey: ["messages", chatId],
        queryFn: async () => {
            const res = await api.get(`/chats/${chatId}/messages`)
            return res.data
        }
    })
}