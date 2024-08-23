const crypto = require("crypto");
require("dotenv").config();

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'base64');

const decrypt = (encryptedText) => {
  let encryptedData = Buffer.from(encryptedText, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// console.log(decrypt("ce2a3aa2a1d7a2b7bbb44b52a06e2707"));

module.exports = decrypt;