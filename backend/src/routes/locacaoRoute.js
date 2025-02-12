import express from 'express';
import { cancelarLocacao, criarLocacao, listarLocacoesUsuario } from '../controllers/locacaoController.js';

const locacaoRoutes = express.Router()

locacaoRoutes.post('/criar', criarLocacao);
locacaoRoutes.delete('/cancelar/:id', cancelarLocacao);
locacaoRoutes.get('/listar/:id', listarLocacoesUsuario);

export default locacaoRoutes