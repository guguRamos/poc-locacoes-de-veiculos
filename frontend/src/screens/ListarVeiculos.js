import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ListarVeiculos = () => {
  const [veiculos, setVeiculos] = useState([])
  const navigate = useNavigate()
  const [marca, setMarca] = useState('')
  const [ano, setAno] = useState('')
  const [status, setStatus] = useState('')

  async function getVeiculos() {
    const queryParams = new URLSearchParams();

    if (marca) queryParams.append('marca', marca);
    if (ano.length === 4) queryParams.append('ano', ano);
    if (status) queryParams.append('status', status);

    const response = await fetch(`http://localhost:3000/veiculos/listar?${queryParams.toString()}`, {
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

  async function apagarVeiculo(id) {

    const response = await fetch(`http://localhost:3000/veiculos/apagar/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro no listar');
    }

    getVeiculos()
  }

  useEffect(() => {
    getVeiculos()
  }, [])

  useEffect(() => {
    getVeiculos()
  }, [marca, ano, status])
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Listando veiculo</h2>
      <div style={{ marginBottom: '16px' }}>
        <h3>Filtros:</h3>
        <div>
          <div>
            <label htmlFor="marca">Marca: </label>
            <input type="text" name="marca" id="marca" value={marca} onChange={(e) => {
              setMarca(e.target.value)
            }} />
          </div>
          <div>
            <label htmlFor="ano">Ano: </label>
            <input type="number" name="ano" id="ano" step={1} min={1} value={ano} onChange={(e) => {
              setAno(e.target.value)
            }} />
          </div>
          <div>
            <select name="status" id="status" value={status} onChange={(e) => {
              setStatus(e.target.value)
            }}>
              <option value={""}>Escolha um status</option>
              <option value={"disponível"}>Disponível</option>
              <option value={"alugado"}>alugado</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: "24px" }}>
        {veiculos.map((data, index) => {
          return (<div style={{ padding: '16px', backgroundColor: "#ccc", borderRadius: "8px" }}>
            <h3>Veiculo {index + 1} ({data.status})</h3>
            <h4>{data._id}</h4>
            <p>Marca: {data.marca}</p>
            <p>Modelo: {data.modelo}</p>
            <p>Ano: {data.ano}</p>
            <p>Preço do dia: R$ {data.precoDia}</p>
            <div style={{ display: 'flex', gap: "16px" }}>
              {data.status === 'disponível' && <button onClick={() => navigate(`/veiculos/alugar/${data._id}`)}>Alugar</button>}
              <button onClick={() => navigate(`/veiculos/editar/${data._id}`)}>Editar</button>
              <button onClick={() => apagarVeiculo(data._id)}>Apagar</button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListarVeiculos