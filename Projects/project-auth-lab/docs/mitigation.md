# Mitigation — SQL Injection Prevention

## Vulnerability

The vulnerable application allowed SQL Injection due to unsafe string concatenation.

Example:

```js
const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
```

---

## Secure Implementation

The issue was resolved using parameterized queries.

```js
const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
db.get(sql, [username, password], callback);
```

---

## Why This Works

Parameterized queries separate SQL logic from user input.

The database treats user input strictly as data, preventing injection attacks.

---


## Password Hashing with bcrypt

Passwords are now stored using bcrypt hashing.

Example:

```js
const hash = await bcrypt.hash(password, 10);
```

During login:

```js
const match = await bcrypt.compare(password, storedHash);
```

---

## Why bcrypt Is Secure

bcrypt provides:

* Salted hashes
* Adaptive cost factor
* Resistance to brute-force attacks

---

## Session Security Improvements

Several protections were implemented to secure user sessions.

### Cookie Security Flags

```js
cookie: {
  httpOnly: true,
  secure: true,
  sameSite: "lax"
}
```

These flags prevent client-side access and reduce attack surface.

---

### Session Regeneration

After successful login:

```js
req.session.regenerate(...)
```

This prevents session fixation attacks.

---

### Session Expiration

Sessions now expire automatically after a defined time period.

---

## Brute Force Protection

### Implemented Controls

- Failed login attempt tracking per user
- Temporary account lockout after 5 failed attempts
- Lock duration: 5 minutes
- Reset attempt counter after successful login

### Technical Implementation

The system stores login attempts in memory:

```js
const loginAttempts = {};


## Additional Improvements

* Stronger session secret
* httpOnly cookie configuration
* Disabled unnecessary session initialization
* Rate-Limiting
---

## Security Outcome

1. Authentication bypass via SQL Injection is no longer possible.
2. If the database is leaked, attackers cannot directly read user passwords.
3. The risk of session hijacking and fixation attacks is significantly reduced.
4. it stop from guessing randomly without limit.

---

## Industry Best Practice

Prepared statements are the standard defense against SQL Injection across all major database systems.

---

## Next Steps

Implement password hashing to prevent credential theft.

