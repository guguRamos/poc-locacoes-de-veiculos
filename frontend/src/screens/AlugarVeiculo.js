import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const AlugarVeiculo = () => {
  const { user } = useContext(GlobalContext)
  const { id } = useParams();
  const [veiculo, setVeiculo] = useState();
  const [dataInicio, setDataInicio] = useState()
  const [dataFinal, setDataFinal] = useState()
  const [qtdDias, setQtdDias] = useState(1)
  const navigate = useNavigate()

  async function getVeiculo() {

    const response = await fetch(`http://localhost:3000/veiculos/listar/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro no listar veiculo');
    }

    const data = await response.json();

    setVeiculo(data)
  }

  function calcularQtdDias() {

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFinal);

    const diferencaTempo = fim - inicio;


    const qtdDias = diferencaTempo / (1000 * 60 * 60 * 24);

    setQtdDias(qtdDias)
    return qtdDias

  };
  function calcularHoje() {

    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;

  };


  async function confirmarLocacao(e) {
    e.preventDefault()

    if (dataInicio > calcularHoje()) {
      throw new Error('Data inválida')
    }
    if (dataFinal < dataInicio) {
      throw new Error('Data inválida')
    }

    const request = {
      veiculoId: id,
      userId: user.id,
      dataInicio,
      dataFinal,
      precoTotal: veiculo.precoDia * qtdDias,
      qtdDias: calcularQtdDias()
    }
    console.log(request)

    const response = await fetch('http://localhost:3000/locacao/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Erro no criar locação');
    }

    // const data = await response.json();

    navigate('/')
  }

  useEffect(() => {
    getVeiculo()
  }, [])
  useEffect(() => {
    calcularQtdDias()
  }, [dataInicio, dataFinal])

  if (veiculo)
    return (
      <div>
        <h2>Alugando veiculo {id}</h2>
        <form action={'#'} onSubmit={confirmarLocacao}>
          <div style={{ padding: '16px', backgroundColor: "#ccc", borderRadius: "8px" }}>
            <h3>{veiculo._id}</h3>
            <p>Marca: {veiculo.marca}</p>
            <p>Modelo: {veiculo.modelo}</p>
            <p>Ano: {veiculo.ano}</p>
            <p>Preço do dia: R$ {veiculo.precoDia}</p>

          </div>
          <div style={{ marginTop: '24px' }}>
            <label htmlFor="dataInicio">Data inicio: </label>
            <input type="date" name="dataInicio" id="dataInicio"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              min={() => {
                calcularHoje()
              }}
            />
          </div>
          <div style={{ marginTop: '24px' }}>
            <label htmlFor="dataFinal">Data final: </label>
            <input type="date" name="dataFinal" id="dataFinal"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
          <h4>Quantidade de dias: {qtdDias}</h4>
          <h4>Preço total: R$ {qtdDias * veiculo.precoDia}</h4>
          {qtdDias > 0 && <div style={{ marginTop: '12px' }}>
            <button type='submit'>Confirmar locação</button>
          </div>}

        </form>
      </div>
    )
}

export default AlugarVeiculo