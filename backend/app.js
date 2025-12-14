const express = require("express");
const cors = require("cors");
const sweetRoutes = require("./routes/sweets");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/", (req, res) => {
  res.send("Sweet Shop Backend is running!!");
});

module.exports = app;

