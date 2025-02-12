import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';

const MinhasLocacoes = () => {
  const { user } = useContext(GlobalContext)
  const [veiculos, setVeiculos] = useState([])

  async function getLocacoes() {
    const response = await fetch(`http://localhost:3000/locacao/listar/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro no listar');
    }
    const data = await response.json()


    setVeiculos(data);
  }

  async function cancelarLocacao(id) {
    const response = await fetch(`http://localhost:3000/locacao/cancelar/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro no cancelar');
    }

    getLocacoes()
  }

  useEffect(() => {
    getLocacoes()
  }, [])

  function formatarData(data) {

  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Listando minhas locações</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: "24px" }}>
        {veiculos.map((data, index) => {
          return (<div style={{ padding: '16px', backgroundColor: "#ccc", borderRadius: "8px" }}>
            <h3>Veiculo {index + 1} ({data.veiculo.status})</h3>
            <h4>{data.veiculo._id}</h4>
            <p>Marca: {data.veiculo.marca}</p>
            <p>Modelo: {data.veiculo.modelo}</p>
            <p>Ano: {data.veiculo.ano}</p>
            <p>Dia de retirada: {new Date(data.dataInicio).toLocaleDateString('pt-BR')}</p>
            <p>Horário retirada: {data.horarioRetirada}</p>
            <p>Dia de devolução: {new Date(data.dataFinal).toLocaleDateString('pt-BR')}</p>
            <p>Horario Devolução: {data.horarioDevolucao}</p>
            <p>Preço do dia: R$ {data.veiculo.precoDia}</p>
            <p style={{ fontWeight: '700' }}>Preço total: R$ {data.precoTotal}</p>
            <div style={{ display: 'flex', gap: "16px" }}>
              <button onClick={() => cancelarLocacao(data._id)}>Cancelar</button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default MinhasLocacoes