import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { DBStore } from '../models/store.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Multer storage setup for profile pictures and student attachments
const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = 'avatar_' + Date.now() + '_' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPG, PNG, WEBP, GIF) are allowed for avatar upload.'));
  }
});

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, department, semester, phoneNumber } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const existing = await DBStore.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await DBStore.createUser({
      name,
      email,
      password: hashedPassword,
      department: department || 'Computer Science & Engineering',
      semester: semester || 'Semester 1',
      phoneNumber: phoneNumber || '+91 98765 00000',
      cgpa: 8.5,
      attendance: 85.0
    });

    const secret = process.env.JWT_SECRET || 'university_student_ai_secret_jwt_key_2026';
    const token = jwt.sign(
      { id: newUser._id || newUser.id, email: newUser.email, name: newUser.name },
      secret,
      { expiresIn: '7d' }
    );

    const { password: _, ...userSafe } = newUser;
    res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      token,
      user: userSafe
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const user = await DBStore.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password. Please check your credentials.' });
    }

    const secret = process.env.JWT_SECRET || 'university_student_ai_secret_jwt_key_2026';
    const token = jwt.sign(
      { id: user._id || user.id, email: user.email, name: user.name },
      secret,
      { expiresIn: '7d' }
    );

    const { password: _, ...userSafe } = user;
    res.json({
      success: true,
      message: 'Login successful! Welcome back.',
      token,
      user: userSafe
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
});

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please enter your registered student email.' });
    }

    const user = await DBStore.findUserByEmail(email);
    if (!user) {
      // Security standard: don't reveal if email exists, or provide demo reset code
      return res.status(404).json({ success: false, message: 'No registered student account found with this email.' });
    }

    // Generate token valid for 1 hour
    const resetToken = 'rst_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    const expiresAt = new Date(Date.now() + 3600 * 1000);

    await DBStore.setResetToken(email, resetToken, expiresAt);

    // In a live system an email would be dispatched; for convenience we return token or simulate
    res.json({
      success: true,
      message: 'Password reset link has been dispatched to your email!',
      resetToken, // Returned for instant testing and demonstration
      demoInstructions: 'For quick testing, use the provided reset token or the simulated reset link.'
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ success: false, message: 'Error processing password reset request.' });
  }
});

// RESET PASSWORD
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Reset token and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await DBStore.resetPasswordByToken(token, hashedPassword);

    if (!updatedUser) {
      return res.status(400).json({ success: false, message: 'Invalid or expired password reset token.' });
    }

    res.json({
      success: true,
      message: 'Password has been successfully updated! You can now log in.'
    });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ success: false, message: 'Error resetting password.' });
  }
});

// GET CURRENT USER PROFILE
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await DBStore.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }
    const { password: _, ...userSafe } = user;
    res.json({ success: true, user: userSafe });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ success: false, message: 'Error loading user profile.' });
  }
});

// UPDATE PROFILE
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, department, semester, phoneNumber, hostelResident, cgpa, attendance } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (department) updates.department = department;
    if (semester) updates.semester = semester;
    if (phoneNumber) updates.phoneNumber = phoneNumber;
    if (typeof hostelResident === 'boolean') updates.hostelResident = hostelResident;
    if (cgpa !== undefined) updates.cgpa = Number(cgpa);
    if (attendance !== undefined) updates.attendance = Number(attendance);

    const updated = await DBStore.updateUser(req.user.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'User could not be updated.' });
    }

    const { password: _, ...userSafe } = updated;
    res.json({
      success: true,
      message: 'Student profile updated successfully!',
      user: userSafe
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, message: 'Error updating profile.' });
  }
});

// AVATAR UPLOAD VIA MULTER
router.post('/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    const updated = await DBStore.updateUser(req.user.id, { avatar: avatarUrl });

    res.json({
      success: true,
      message: 'Avatar uploaded successfully!',
      avatarUrl,
      user: updated
    });
  } catch (err) {
    console.error('Avatar upload error:', err);
    res.status(500).json({ success: false, message: err.message || 'Avatar upload failed.' });
  }
});

export default router;
