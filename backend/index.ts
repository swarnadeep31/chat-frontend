import express from "express"
import cors from "cors"
import messageRoutes from "./routers/message.route"

const app = express() ; 
app.use(cors())
app.use(express.json())

// app.get("/health", (_req, res) => {
//   res.send("OK");
// });

app.use("/api",messageRoutes)

const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Temp backend running on PORT:${PORT}`)
})