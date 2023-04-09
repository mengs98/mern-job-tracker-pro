import User from '../models/User.js';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { attachCookie } from '../utils/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new BadRequestError('Please fill in all fields');

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) throw new BadRequestError('Email already registered');

  const newUser = await User.create({ name, email, password });
  console.log(newUser);

  const token = newUser.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      location: newUser.location,
    },
    location: newUser.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('Please fill in all fields');

  const userExists = await User.findOne({ email }).select('+password');
  if (!userExists) throw new UnAuthenticatedError('Invalid credentials');

  const isPasswordCorrect = await userExists.comparePassword(password);
  if (!isPasswordCorrect) throw new UnAuthenticatedError('Invalid credentials');

  const token = userExists.createJWT();
  attachCookie({ res, token });
  userExists.password = undefined;

  res
    .status(StatusCodes.OK)
    .json({ user: userExists, location: userExists.location });
};

const updateUser = async (req, res) => {
  const { email, name, location } = req.body;

  if (!email || !name || !location)
    throw new BadRequestError('Please fill in all fields');

  const userExists = await User.findOne({ _id: req.user.userId });

  userExists.name = name;
  userExists.email = email;
  userExists.location = location;

  await userExists.save();

  const token = userExists.createJWT();
  attachCookie({ res, token });

  res
    .status(StatusCodes.OK)
    .json({ user: userExists, location: userExists.locations });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};

export { register, login, updatedUser, getCurrentUser, logout };
