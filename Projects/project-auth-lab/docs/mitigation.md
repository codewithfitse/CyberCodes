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

## Additional Improvements

* Stronger session secret
* httpOnly cookie configuration
* Disabled unnecessary session initialization

---

## Security Outcome

Authentication bypass via SQL Injection is no longer possible.

---

## Industry Best Practice

Prepared statements are the standard defense against SQL Injection across all major database systems.

---

## Next Steps

Implement password hashing to prevent credential theft.
