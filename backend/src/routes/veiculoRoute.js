import express from 'express'
import { apagarVeiculo, criarVeiculo, editarVeiculo, listarVeiculoById, listarVeiculos } from '../controllers/veiculoController.js';

const veiculoRoutes = express.Router();

veiculoRoutes.post('/criar', criarVeiculo);
veiculoRoutes.put('/editar/:id', editarVeiculo);
veiculoRoutes.delete('/apagar/:id', apagarVeiculo);
veiculoRoutes.get('/listar', listarVeiculos);
veiculoRoutes.get('/listar/:id', listarVeiculoById);

export default veiculoRoutes