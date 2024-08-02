const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token.split(' ')[1], 'SECRET_KEY');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' });
  }
}

module.exports = { authenticateToken };
