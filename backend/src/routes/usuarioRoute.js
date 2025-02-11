import express from 'express';
import { criarUsuario, login } from '../controllers/usuarioController.js';

const usuarioRoute = express.Router();

usuarioRoute.post('/criar', criarUsuario);
usuarioRoute.post('/login', login);


export default usuarioRoute;
