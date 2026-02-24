// vulnerable/server.js (ES Modules, intentionally insecure)

import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import session from "express-session";


const app = express();

const SQLite3 = sqlite3.verbose();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(
  session({
    secret: "dev_secret", // weak secret (intentional)
    resave: false,
    saveUninitialized: true,
  })
);

const db = new SQLite3.Database("./db.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      password TEXT
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO users (id, username, password)
    VALUES (1, 'Fitsum', 'password123')
  `);
});

// Home route
app.get("/", (req, res) => {
  res.send("Auth lab - vulnerable version running");
});

// 🚨 Vulnerable login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // SQL Injection vulnerability (intentional)
  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(sql, (err, row) => {
    if (row) {
      req.session.user = row.username;
      return res.send(`Welcome ${row.username}`);
    }

    res.status(401).send("Invalid credentials");
  });
});

app.listen(3000, () => {
  console.log("Vulnerable app running on http://localhost:3000");
});