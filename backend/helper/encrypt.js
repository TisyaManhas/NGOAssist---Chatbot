const crypto = require("crypto");
require("dotenv").config();

const key = Buffer.from(process.env.ENCRYPTION_KEY, "base64");
const iv = process.env.ENCRYPTION_IV;

const encrypt = (text) => {
  let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

module.exports = encrypt;
