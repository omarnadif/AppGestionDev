import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoute.js';
import roleRoutes from './routes/roleRoute.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/auth', authRoutes);


// Test route
app.get('/', (req, res) => {
    res.send('API Running');
});

export default app; // Exporter par défaut l'application Express
