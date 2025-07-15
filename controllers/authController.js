import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

const signToken = userId =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '2h' });

// POST /api/auth/register
export async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken(user.id);
    res.status(201).json({ token, user: pickUser(user) });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken(user.id);
    res.json({ token, user: pickUser(user) });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me   (protected)
export async function current(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: pickUser(user) });
  } catch (err) {
    next(err);
  }
}

// helper to avoid sending password / extra fields
function pickUser({ id, name, email, createdAt }) {
  return { id, name, email, createdAt };
}
