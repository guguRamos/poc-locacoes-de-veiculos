
import Veiculos from "../models/Veiculo.js";

export const criarVeiculoService = async (marca, modelo, ano, precoDia, status) => {


  const novoVeiculo = new Veiculos({
    marca, modelo, ano, precoDia, status
  });

  await novoVeiculo.save();

  return "Veiculo criado";
}

export const editarVeiculoService = async (id, marca, modelo, ano, precoDia, status) => {

  const veiculoAtualizado = await Veiculos.findByIdAndUpdate(id,
    { $set: { marca, modelo, ano, precoDia, status } }, { new: true, runValidators: true }
  )

  return veiculoAtualizado;
}

export const apagarVeiculoService = async (id) => {

  const veiculoExistente = await Veiculos.findById(id)
  if (!veiculoExistente)
    return res.status(400).json({ message: "Veiculo não encontrado" });

  await Veiculos.findByIdAndDelete(id)

  return "Veiculo apagado";
}

export const listarVeiculosService = async (filtros) => {
  const query = {};

  if (filtros.marca) {
    query.marca = { $regex: filtros.marca, $options: "i" };
  }

  if (filtros.ano) {
    const ano = Number(filtros.ano);
    if (!isNaN(ano)) {
      query.ano = ano;
    } else {
      throw new Error('Ano inválido');
    }
  }

  if (filtros.status) {
    query.status = { $regex: filtros.status, $options: "i" };
  }

  const veiculos = await Veiculos.find(query);

  return veiculos;
}

export const listarVeiculoByIdService = async (id) => {


  const veiculo = await Veiculos.findById(id);

  return veiculo;
}

