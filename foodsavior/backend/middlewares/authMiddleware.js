const jwt = require('jsonwebtoken');

// ✅ Verify JWT Token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Example: Authorization: Bearer <token>
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid token format' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey'); 
    req.user = decoded; // store decoded data { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ✅ Verify Role Middleware
exports.verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};
