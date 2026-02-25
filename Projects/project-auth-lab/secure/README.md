# Secure Application

This directory contains the secure version of the authentication system with improved security practices.

## Security Improvements

* Parameterized SQL queries
* Environment-based secrets
* Strong session configuration
* httpOnly cookies

---

## Environment Variables

Create a `.env` file inside this directory:

```
SESSION_SECRET=your_random_secret_here
PORT=3000
```

Do not commit the `.env` file to version control.

---

## Running the Server

Install dependencies:

```bash
npm install
```

Start server:

```bash
node server.js
```

Server will run on the configured port.
