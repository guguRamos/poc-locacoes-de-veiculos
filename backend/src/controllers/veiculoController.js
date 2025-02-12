import { apagarVeiculoService, criarVeiculoService, editarVeiculoService, listarVeiculoByIdService, listarVeiculosService } from "../services/veiculoService.js";

export const criarVeiculo = async (req, res) => {
  try {
    const { marca, modelo, ano, precoDia, status } = req.body;

    const response = await criarVeiculoService(marca, modelo, ano, precoDia, status);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar", error });
  }
}

export const editarVeiculo = async (req, res) => {
  try {
    const { marca, modelo, ano, precoDia, status } = req.body;
    const { id } = req.params;

    const response = await editarVeiculoService(id, marca, modelo, ano, precoDia, status);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao editar", error });
  }
}

export const apagarVeiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await apagarVeiculoService(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao apagar", error });
  }
}

export const listarVeiculos = async (req, res) => {
  try {
    const filtros = req.query;

    const response = await listarVeiculosService(filtros);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Erro ao listar: ", error.message);
    throw new Error("Erro ao listar ");
  }
}

export const listarVeiculosUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await listarVeiculosService(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar", error });
  }
}

export const listarVeiculoById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await listarVeiculoByIdService(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar", error });
  }
}
