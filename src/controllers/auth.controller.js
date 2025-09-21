const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');

const registerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

function signToken(user) {
  const payload = { sub: user._id.toString(), email: user.email, name: user.name };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    // Check if database is available
    if (process.env.DB_AVAILABLE !== 'true') {
      // Mock registration for demo purposes
      const mockUser = {
        _id: 'mock-user-id',
        name,
        email,
        createdAt: new Date()
      };
      
      const token = signToken(mockUser);
      return res.status(201).json({
        message: 'Registered successfully (demo mode)',
        token,
        user: { id: mockUser._id, name: mockUser.name, email: mockUser.email, createdAt: mockUser.createdAt }
      });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hash });

    const token = signToken(user);
    res.status(201).json({
      message: 'Registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt }
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: err.flatten() });
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Check if database is available
    if (process.env.DB_AVAILABLE !== 'true') {
      // Mock login for demo purposes - accept any valid email/password
      const mockUser = {
        _id: 'mock-user-id',
        name: 'Demo User',
        email,
        createdAt: new Date()
      };
      
      const token = signToken(mockUser);
      return res.json({
        message: 'Logged in (demo mode)',
        token,
        user: { id: mockUser._id, name: mockUser.name, email: mockUser.email, createdAt: mockUser.createdAt }
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    res.json({
      message: 'Logged in',
      token,
      user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt }
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: err.flatten() });
    }
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    // Check if database is available
    if (process.env.DB_AVAILABLE !== 'true') {
      // Mock user for demo purposes
      const mockUser = {
        _id: 'mock-user-id',
        name: 'Demo User',
        email: req.user.email,
        createdAt: new Date()
      };
      return res.json({ user: mockUser });
    }

    const user = await User.findById(req.user.sub).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};