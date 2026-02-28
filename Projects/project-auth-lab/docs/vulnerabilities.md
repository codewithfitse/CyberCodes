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
 
## Weak Session Configuration

### Description

The initial session implementation lacked proper security controls such as cookie flags and session regeneration.

---

### Impact

* Account takeover
* Credential reuse attacks
* Privilege escalation
* Data breaches
* Session hijacking
* Session fixation
* Cookie theft
* Unauthorized account access
* If successful, the attacker gains full access to the victim’s account.

---

## No Rate Limiting on Login

### Description
The login endpoint allowed unlimited authentication attempts.

### Risk
Attackers could automate password guessing through brute force or credential stuffing attacks.


## Root Cause

The vulnerability exists because:

1. User input is trusted.
2. SQL query is constructed using string interpolation.
3. No prepared statements are used.
4. Passwords were stored without hashing or encryption.
5. Default session settings were used without security hardening.

---

## Severity

1. High — Authentication bypass is a critical vulnerability.
2. High — session compromise can lead to full account takeover.
3. High — Could guess password and takeover whole account.