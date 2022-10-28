import mongoose from 'mongoose';
import { MONGODB_URI } from './var.js';

const dbconnect = () => {
  try {
    mongoose.connect(MONGODB_URI);
    console.log('DB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default dbconnect;
