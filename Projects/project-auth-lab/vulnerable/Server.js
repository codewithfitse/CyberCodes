// vulnerable/server.js (minimal, intentionally insecure for lab)
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "dev_secret", resave: false, saveUninitialized: true }));

const db = new sqlite3.Database('./db.sqlite');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)`);
  db.run(`INSERT OR IGNORE INTO users (id, username, password) VALUES (1, 'alice', 'password123')`);
});

// Vulnerable login: string concatenation (SQLi), plaintext passwords, predictable session
app.get('/', (req, res) => res.send('Auth lab - vulnerable'));
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // VULNERABLE: direct string interpolation
  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.get(sql, (err, row) => {
    if (row) {
      req.session.user = row.username;
      return res.send(`Welcome ${row.username}`);
    }
    res.status(401).send('Invalid');
  });
});

app.listen(3000, () => console.log('Vulnerable app on :3000'));