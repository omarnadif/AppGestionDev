import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoute.js';
import roleRoutes from './routes/roleRoute.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';






dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:8080', // ⚠️ Mets l'URL exacte de ton frontend
    credentials: true, // 🔥 Indispensable pour gérer les cookies et sessions
    allowedHeaders: ['Content-Type', 'Authorization'], // Permet les headers nécessaires
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Définit les méthodes autorisées
  }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

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
