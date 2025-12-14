const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

// REGISTER
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err) => {
          if (err) return res.status(500).json({ message: err.message });
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.length === 0)
        return res.status(400).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      res.json({
        message: "Login successful",
        user: {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email
        }
      });
    }
  );
});

module.exports = router;
