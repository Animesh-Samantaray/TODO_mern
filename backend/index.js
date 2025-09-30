import express from 'express';
import mongoose from 'mongoose';
import { connectDb } from './conn.js';
import auth from './routes/auth.js';
import list from './routes/list.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Needed because in ES Modules "__dirname" is not available
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 1000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // during dev
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Connect DB
connectDb();

// API routes
app.use('/api/auth', auth);
app.use('/api/list', list);

// ✅ Serve frontend build (after running `npm run build` inside frontend)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
