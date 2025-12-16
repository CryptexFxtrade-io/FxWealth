const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
      const decoded = jwt.verify(
        token,
        process.env.FxWealthJWT_SECRET
      );
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};
