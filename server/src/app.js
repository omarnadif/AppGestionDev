import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);


// Test route
app.get('/', (req, res) => {
    res.send('API Running');
});

export default app; // Exporter par défaut l'application Express
