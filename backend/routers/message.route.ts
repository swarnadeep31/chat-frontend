import express from "express"
import multer from "multer"
import { getMessages, sendMessages } from "../controllers/message.controller"

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

router.get("/chats/:id/messages",getMessages)
router.post("/chats/:id/messages",upload.single("file"),sendMessages)

export default router