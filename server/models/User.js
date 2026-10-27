import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  studentId: { type: String, default: () => 'APEX-' + Math.floor(100000 + Math.random() * 900000) },
  department: { type: String, default: 'Computer Science & Engineering' },
  semester: { type: String, default: 'Semester 4' },
  cgpa: { type: Number, default: 8.65 },
  attendance: { type: Number, default: 84.5 },
  avatar: { type: String, default: '' },
  phoneNumber: { type: String, default: '+91 98765 43210' },
  hostelResident: { type: Boolean, default: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
