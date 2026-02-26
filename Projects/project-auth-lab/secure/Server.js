import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import session from "express-session";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const SQLite3 = sqlite3.verbose();

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: "auth_lab_session",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true, // JS cannot access cookie
      secure: false, // true in production (HTTPS)
      sameSite: "lax", // CSRF protection
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
  }),
);

const db = new SQLite3.Database("../vulnerable/db.sqlite");

app.get("/", (req, res) => {
  res.send("Secure auth server running");
});

// ✅ REGISTER (hash password)
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(sql, [username, hashed], (err) => {
    if (err) return res.status(500).send("Error");

    res.send("User created");
  });
});

// ✅ LOGIN (compare hash)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = ?`;

  db.get(sql, [username], async (err, row) => {
    if (err) return res.status(500).send("Error");

    if (!row) return res.status(401).send("Invalid");

    const match = await bcrypt.compare(password, row.password);

    if (!match) return res.status(401).send("Invalid");

    req.session.regenerate((err) => {
      if (err) return res.status(500).send("Session error");

      req.session.user = row.username;

      res.send(`Welcome ${row.username}`);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Secure server running on http://localhost:${PORT}`);
});
