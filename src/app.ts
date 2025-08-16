import express from 'express';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes); // Exportado como router

// Hacer una API REST para la gestión de usuarios

export default app;

/** NOTAS PERSONALES
 * - Registro de changelog guardado en Sticky Notes
 */