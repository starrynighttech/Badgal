const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()
app.use(cors())
app.use(express.json())

// ===============================
// GLOBAL IN-MEMORY LEDGER (replace with MongoDB in production)
// ===============================
const users = []
const ledger = []

// ===============================
// AUTH SYSTEM
// ===============================
app.post("/auth/register", (req, res) => {
  const user = {
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email
  }
  users.push(user)
  res.json(user)
})

app.post("/auth/login", (req, res) => {
  const user = users.find(u => u.email === req.body.email)
  if (!user) return res.status(404).json({ error: "User not found" })

  const token = jwt.sign(user, "secret")
  res.json({ token })
})

// ===============================
// WALLET (LEDGER BASED)
// ===============================
app.get("/wallet/:id", (req, res) => {
  const userLedger = ledger.filter(l => l.userId === req.params.id)

  const balance = userLedger.reduce((sum, t) => sum + (t.amount || 0), 0)

  res.json({ balance, transactions: userLedger })
})

// ===============================
// EARN MONEY (ADS / REFERRALS)
// ===============================
app.post("/earn", (req, res) => {
  ledger.push({
    userId: req.body.userId,
    type: "earn",
    amount: req.body.amount,
    source: req.body.source || "ads",
    time: Date.now()
  })

  res.json({ success: true })
})

// ===============================
// PAYNOW (MANUAL VERIFICATION SYSTEM)
// ===============================
app.post("/paynow", (req, res) => {
  ledger.push({
    userId: req.body.userId,
    type: "paynow",
    amount: -req.body.amount,
    status: "pending_verification",
    time: Date.now()
  })

  res.json({
    status: "submitted",
    message: "Payment pending admin verification"
  })
})

// ===============================
// CASH ORDER SYSTEM
// ===============================
app.post("/cash", (req, res) => {
  ledger.push({
    userId: req.body.userId,
    type: "cash",
    amount: 0,
    status: "cash_on_delivery",
    time: Date.now()
  })

  res.json({
    status: "order_created",
    message: "Cash order placed"
  })
})

// ===============================
// ADS SYSTEM (GLOBAL REVENUE ENGINE)
// ===============================
app.get("/ads", (req, res) => {
  res.json([
    {
      id: "ad1",
      video: "Smoke.mp4",
      reward: 0.1
    }
  ])
})

// ===============================
app.listen(5000, () => {
  console.log("V7 GLOBAL SYSTEM RUNNING ON PORT 5000")
})
