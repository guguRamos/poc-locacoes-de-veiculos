import mongoose from 'mongoose';

const veiculoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  ano: {
    type: Number,
    required: true,
  },
  precoDia: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["disponível", "alugado", "manutenção"], default: "disponível"
  },
});

const Veiculos = mongoose.model('Veiculos', veiculoSchema);

export default Veiculos;