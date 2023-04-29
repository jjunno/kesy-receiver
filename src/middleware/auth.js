require('dotenv').config();

const RPI1_USERNAME = process.env.RPI1_USERNAME;
const RPI1_PASSWORD = process.env.RPI1_PASSWORD;

const verifyCredentials = (req, res, next) => {
  // Parse username and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [username, password] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  if (!username) {
    console.log(`Middleware rejected a request due missing username`);
    return res
      .status(403)
      .json({ message: 'A username is required for authentication' });
  }

  if (!password) {
    console.log(`Middleware rejected a request due missing password`);
    return res
      .status(403)
      .json({ message: 'A password is required for authentication' });
  }

  if (username != RPI1_USERNAME) {
    console.log(`Middleware rejected a request due invalid username`);
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  if (password != RPI1_PASSWORD) {
    console.log(`Middleware rejected a request due invalid password`);
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  return next();
};

module.exports = verifyCredentials;
