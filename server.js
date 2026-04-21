
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const { connectDB } = require("../../packages/db")
const ledger = require("../../packages/wallet/ledger")

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.get("/", (req,res)=>res.send("V6 API Running"))

app.post("/wallet/earn",(req,res)=>{
  ledger.add({type:"earn",amount:req.body.amount})
  res.json({ok:true})
})

app.get("/wallet",(req,res)=>{
  res.json(ledger.all())
})

app.listen(5000, ()=>console.log("V6 running"))
