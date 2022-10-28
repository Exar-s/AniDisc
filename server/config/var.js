import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODBTEST_URI
    : process.env.MONGODB_URI;

export { MONGODB_URI, PORT };
