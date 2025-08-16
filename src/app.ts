import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Hacer una API REST para la gestión de usuarios

export default app;

/** NOTAS PERSONALES
 * - Registro de changelog guardado en Sticky Notes
 */