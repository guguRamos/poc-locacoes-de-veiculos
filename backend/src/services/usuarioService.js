import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

export const criarUsuarioService = async (nome, email, senha) => {

  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({ message: "E-mail já cadastrado" });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = new Usuario({
    nome,
    email,
    senha: senhaHash,
  });

  await novoUsuario.save();

  return "Usuário criado";
}

export const loginService = async (email, senha) => {
  const usuarioExistente = await Usuario.findOne({ email });
  if (!usuarioExistente) {
    return res.status(400).json({ message: "E-mail ou/e senha inválidos" });
  }

  const senhaValidacao = await bcrypt.compare(senha, usuarioExistente.senha)
  if (!senhaValidacao) {
    return res.status(400).json({ message: "E-mail ou/e senha inválidos" });
  }

  return true;
}