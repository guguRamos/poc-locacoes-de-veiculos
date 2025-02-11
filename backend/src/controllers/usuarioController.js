import { criarUsuarioService, loginService } from "../services/usuarioService.js";

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const response = await criarUsuarioService(nome, email, senha);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar", error });
  }
}

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const response = await loginService(email, senha);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro no login", error });
  }
}