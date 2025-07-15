import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'No token, auth denied' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid / expired' });
  }
}
