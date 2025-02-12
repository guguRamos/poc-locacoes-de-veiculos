import mongoose from 'mongoose';

const locacoesSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
  },
  veiculoId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true
  },
  dataInicio: {
    type: Date, required: true
  },
  horarioRetirada: {
    type: String,
    required: true
  },
  dataFinal: {
    type: Date, required: true
  },
  horarioDevolucao: {
    type: String,
    required: true
  },
  precoTotal: {
    type: Number, required: true
  },
  qtdDias: {
    type: Number,
    required: true
  },
});

const Locacoes = mongoose.model('Locacoes', locacoesSchema);

export default Locacoes;