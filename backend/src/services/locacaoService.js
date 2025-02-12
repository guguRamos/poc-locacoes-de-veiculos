import Locacoes from "../models/Locacoes.js";
import Veiculos from "../models/Veiculo.js"

export const criarLocacaoService = async (veiculoId, usuarioId, dataInicio, horarioRetirada, dataFinal, horarioDevolucao, precoTotal, qtdDias) => {
  const veiculoExistente = await Veiculos.findById(veiculoId)

  if (!veiculoExistente) {

    return res.status(400).json({ message: "Veiculo não encontrado" });
  }

  if (veiculoExistente.status !== "disponível") {
    return res.status(400).json({ message: "Veiculo indisponivel" });
  }


  const locacaoSave = await new Locacoes({
    veiculoId,
    usuarioId,
    dataInicio: new Date(dataInicio),
    horarioRetirada,
    horarioDevolucao,
    dataFinal: new Date(dataFinal),
    precoTotal: Number(precoTotal),
    qtdDias: Number(qtdDias)
  }).save();


  veiculoExistente['status'] = "alugado";
  await veiculoExistente.save()

  return locacaoSave
}

export const cancelarLocacaoService = async (id) => {
  const locacaoExistente = await Locacoes.findById(id)

  if (!locacaoExistente)
    return res.status(400).json({ message: "Locação não encontrado" });

  const veiculoExistente = await Veiculos.findById(locacaoExistente.veiculoId)
  if (!veiculoExistente)
    return res.status(400).json({ message: "Veiculo não encontrado" });

  await Locacoes.deleteOne({ _id: id })

  veiculoExistente['status'] = "disponível";
  await veiculoExistente.save()

  return "Locação cancelada"
}

export const listarLocacoesUsuarioService = async (id) => {
  const locacoes = await Locacoes.find({ usuarioId: id });

  const locacoesEVeiculos = await Promise.all(locacoes.map(async (locacao) => {
    const veiculo = await Veiculos.findById(locacao.veiculoId);
    return {
      ...locacao.toObject(),
      veiculo
    };
  }));

  return locacoesEVeiculos;
}
