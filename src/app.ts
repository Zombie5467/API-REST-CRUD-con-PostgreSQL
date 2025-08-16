import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

// Routes
// Autentificación
// User

export default app;

/** NOTAS PERSONALES
 * - Registro de changelog guardado en Sticky Notes
 */