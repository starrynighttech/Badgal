require("dotenv").config()
const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const { connectDB } = require("../../packages/db")
const auth = require("../../packages/auth/middleware")

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

app.use(cors())
app.use(express.json())

connectDB()

app.get("/", (req, res) => res.send("API running"))

app.get("/secure", auth, (req, res) => {
  res.json({ msg: "Secure route", user: req.user })
})

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log("Server running on " + PORT))
