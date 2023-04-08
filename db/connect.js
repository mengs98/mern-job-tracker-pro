import mongoose, { connect } from 'mongoose';

const connectDB = (url) => mongoose.connect(url);

export default connectDB;
