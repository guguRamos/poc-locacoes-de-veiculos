import Locacoes from "../models/Locacoes.js";
import Veiculos from "../models/Veiculo.js"

export const criarLocacaoService = async (veiculoId, userId, dataInicio, dataFinal, precoTotal) => {
  const veiculoExistente = Veiculos.findById(veiculoId)
  if (!veiculoExistente)
    return res.status(400).json({ message: "Veiculo não encontrado" });
  if (veiculoExistente.status !== "disponível")
    return res.status(400).json({ message: "Veiculo indisponivel" });

  const novaLocacao = new Locacoes({
    veiculoId,
    userId,
    dataInicio,
    dataFinal,
    precoTotal
  })

  await novaLocacao.save()

  veiculoExistente['status'] = "alugado";
  await veiculoExistente.save()

  return "Locação feita com sucesso"
}

export const cancelarLocacaoService = async (id) => {
  const locacaoExistente = Locacoes.findById(id)
  const veiculoExistente = Veiculos.findById(locacaoExistente.veiculoId)

  if (!locacaoExistente)
    return res.status(400).json({ message: "Locação não encontrado" });
  if (!veiculoExistente)
    return res.status(400).json({ message: "Veiculo não encontrado" });

  await Locacoes.deleteOne({ _id: id })

  veiculoExistente['status'] = "disponível";
  await veiculoExistente.save()

  return "Locação cancelada"
}

export const listarLocacoesUsuarioService = async (id) => {

  const veiculos = await Locacoes.find({ userId: id });

  return veiculos;
}
