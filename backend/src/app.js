import express from 'express';
import userRoutes from './routes/usuarioRoute.js'
import connectDB from './config/database.js'
import cors from 'cors'
import veiculoRoutes from './routes/veiculoRoute.js';
import locacaoRoutes from './routes/locacaoRoute.js';

const app = express();

connectDB();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(express.json());
app.use('/usuario', userRoutes);
app.use('/veiculos', veiculoRoutes)
app.use('/locacao', locacaoRoutes)

export default app;