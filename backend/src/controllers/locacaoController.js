import { cancelarLocacaoService, criarLocacaoService, listarLocacoesUsuarioService } from "../services/locacaoService.js";

export const criarLocacao = async (req, res) => {
  try {
    const {
      veiculoId,
      userId,
      dataInicio,
      horarioRetirada,
      dataFinal,
      horarioDevolucao,
      precoTotal,
      qtdDias
    } = req.body;

    const response = await criarLocacaoService(veiculoId,
      userId,
      dataInicio,
      horarioRetirada,
      dataFinal,
      horarioDevolucao,
      precoTotal,
      qtdDias
    );

    return res.status(201).json(response);
  } catch (error) {
    console.error('Erro ao salvar locação:', error);
    return res.status(500).json({ message: 'Erro ao salvar locação', error });
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