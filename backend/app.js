const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const chats = require("./data/data")
const cors = require('cors');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const PORT = process.env.PORT || 4000

connectDB()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)

// app.use(notfound)

app.listen(PORT, () =>{
    console.log(`SERVER STARTED AT ${PORT}`);
})