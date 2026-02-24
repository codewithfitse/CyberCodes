# 🔐 Authentication Security Lab — Vulnerable Version

This project is part of a cybersecurity learning roadmap.

The goal is to intentionally build an insecure authentication system to learn:

* How vulnerabilities happen
* How attackers exploit them
* How to fix them later

---

# 📦 Tech Stack

* Node.js
* Express
* SQLite
* express-session

---

# 🚀 Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/codewithfitse/CYBERCODES/Projects/project-auth-lab.git
cd project-auth-lab/vulnerable
```

## 2️⃣ Install Dependencies

```bash
npm install express body-parser sqlite3 express-session
```

## 3️⃣ Run Server

```bash
node Server.js
```

Server will start on:

```
http://localhost:3000
```

---

# 👤 Default Test User

```
username: Fitsum
password: password123
```
project
---

# ⚠️ Known Vulnerabilities (Intentional)

This app is intentionally insecure.

Vulnerabilities include:

* SQL Injection
* Plaintext password storage
* Weak session secret
* No input validation

DO NOT deploy this to production.

---

# 🎯 Learning Objectives

By the end of this lab you should understand:

* How login systems work internally
* How SQL injection bypasses authentication
* Why password hashing is critical
* How sessions identify users

---

# 📅 Roadmap

Day 1 → Basic vulnerable auth
Day 2 → Exploit SQL injection
Day 3 → Fix SQL injection
Day 4 → Password hashing
Day 5 → Session security

---

# ⚖️ Disclaimer

This project is for educational purposes only.
