const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'admin123'; // Choose your admin password here
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log('Hashed password:', hashed);
}

hashPassword();
