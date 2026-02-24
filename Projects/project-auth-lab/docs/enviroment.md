# Environment Setup

## System Requirements

* Node.js >= 18
* npm
* SQLite (included via npm package)

Tested on Linux (Arch).

---

## Installation Steps

Clone repository:

```bash
git clone https://github.com/codewithfitse/CYBERCODES/Projects/project-auth-lab.git
cd project-auth-lab/vulnerable
```

Install dependencies:

```bash
npm install
```

Run server:

```bash
node server.js
```

Server will start at:

```
http://localhost:3000
```

---

## Default Test Credentials

```
username: Fitse
password: password123
```

---

## Secure Version Environment Variables

The secure application uses environment variables to protect sensitive configuration.

Example `.env` file:

```
SESSION_SECRET=your_random_secret_here
PORT=3000
```

Environment variables prevent secrets from being exposed in source code repositories.

---