import { cancelarLocacaoService, criarLocacaoService, listarLocacoesUsuarioService } from "../services/locacaoService.js";

export const criarLocacao = async (req, res) => {
  try {
    const {
      veiculoId,
      userId,
      dataInicio,
      dataFinal,
      precoTotal
    } = req.body;

    const response = await criarLocacaoService(veiculoId,
      userId,
      dataInicio,
      dataFinal,
      precoTotal);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar", error });
  }
}

export const cancelarLocacao = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await cancelarLocacaoService(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao cancelar", error });
  }
}

export const listarLocacoesUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await listarLocacoesUsuarioService(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar", error });
  }
}