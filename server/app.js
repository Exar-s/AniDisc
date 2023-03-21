import express from 'express';
import cors from 'cors';
import dbconnect from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { tokenExtractor } from './middleware/authMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

dbconnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static('images'));

app.use(tokenExtractor);

app.get('/', (req,res) => {
  res.status(200).send('Hello')
})
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

//Reset database, remove in production
(async () => {
  if (process.env.NODE_ENV !== 'production') {
    const { default: resetRoutes } = await import('./routes/resetRoutes.js');
    app.use('/reset', resetRoutes);
  }
})();

app.use((req,res) => {
  res.status(404).send({ error: 'Unknown Endpoint' });
})
app.use(errorHandler);

export default app;
