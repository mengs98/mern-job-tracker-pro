import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please specify your name'],
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [20, 'Name must not exceed 20 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please specify your email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please specify a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please specify password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  location: {
    type: String,
    trim: true,
    default: 'Bali, Indonesia',
    required: [true, 'Please specify your location'],
    minlength: [2, 'Position must be at least 2 characters'],
    maxlength: [20, 'Position must not exceed 20 characters'],
  },
});

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())

  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candiadtePassword, this.password);

  return isMatch;
};

export default mongoose.model('User', UserSchema);
