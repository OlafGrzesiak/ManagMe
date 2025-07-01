const jwt = require('jsonwebtoken');

const JWT_SECRET = 'tajnyklucz';
const JWT_REFRESH_SECRET = 'tajnyklucz_refresh';

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = { generateToken, generateRefreshToken, verifyRefreshToken };
