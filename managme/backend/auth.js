const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByLogin } = require('./users');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('./tokenUtils');

const router = express.Router();

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = getUserByLogin(login);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ token, refreshToken });
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  try {
    const payload = verifyRefreshToken(refreshToken);
    const newToken = generateToken(payload);
    res.json({ token: newToken });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

module.exports = router;
