import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config(); // load env variables

const app = express();
const SQLite3 = sqlite3.verbose();

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || "fallback_secret";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

const db = new SQLite3.Database("../vulnerable/db.sqlite");

app.get("/", (req, res) => {
  res.send("Secure auth server running");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(sql, [username, password], (err, row) => {
    if (err) return res.status(500).send("Database error");

    if (row) {
      req.session.user = row.username;
      return res.send(`Welcome ${row.username}`);
    }

    res.status(401).send("Invalid credentials");
  });
});

app.listen(PORT, () => {
  console.log(`Secure server running on http://localhost:${PORT}`);
});