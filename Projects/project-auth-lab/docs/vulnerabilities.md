# Vulnerabilities Analysis

## SQL Injection in Login Function

### Description

The login functionality is vulnerable to SQL Injection due to unsafe string concatenation of user input into the SQL query.

Vulnerable code:

```js
const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
```

User input is directly embedded into the query without sanitization or parameterization.

---

## Plaintext Password Storage

### Description

The vulnerable application stored user passwords in plaintext within the database.

If the database were compromised, attackers could immediately access user credentials.

---
 
### Impact

* Account takeover
* Credential reuse attacks
* Privilege escalation
* Data breaches

---


## Root Cause

The vulnerability exists because:

1. User input is trusted.
2. SQL query is constructed using string interpolation.
3. No prepared statements are used.
4. Passwords were stored without hashing or encryption.

---

## Severity

High — Authentication bypass is a critical vulnerability.
