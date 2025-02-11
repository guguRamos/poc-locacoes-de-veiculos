import express from 'express';
import { criarLocacao } from '../controllers/locacaoController.js';
import { cancelarLocacaoService, listarLocacoesUsuarioService } from '../services/locacaoService.js';

const locacaoRoutes = express.Router()

locacaoRoutes.post('/criar', criarLocacao);
locacaoRoutes.delete('/cancelar/:id', cancelarLocacaoService);
locacaoRoutes.get('/locacoes/:id', listarLocacoesUsuarioService);

export default locacaoRoutes