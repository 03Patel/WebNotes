
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
 
  const authHeader = req.header('Authorization'); // e.g., "Bearer <token>"
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // attach user info to request
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
