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

## Impact

An attacker can:

* Bypass authentication
* Access arbitrary user accounts
* Potentially extract database data
* Escalate privileges if admin accounts exist

---

## Root Cause

The vulnerability exists because:

1. User input is trusted.
2. SQL query is constructed using string interpolation.
3. No prepared statements are used.

---

## Severity

High — Authentication bypass is a critical vulnerability.
