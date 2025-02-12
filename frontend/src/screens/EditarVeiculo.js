import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditarVeiculo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [veiculo, setVeiculo] = useState()

  async function handleSubmit(event) {
    event.preventDefault()

    const marca = event.target.marca.value;
    const modelo = event.target.modelo.value;
    const ano = event.target.ano.value;
    const precoDia = event.target.precoDia.value;


    const response = await fetch(`http://localhost:3000/veiculos/editar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ marca, modelo, ano, precoDia }),
    });

    if (!response.ok) {
      throw new Error('Erro no editar veiculo');
    }

    await response.json();


    navigate('/veiculos/listar')
  }

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

  useEffect(() => {
    getVeiculo()
  })

  if (veiculo)
    return (
      <div>
        <h2>Editando veiculo</h2>

        <form action="#" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="marca">Marca: </label>
            <input type="text" name="marca" id="marca" defaultValue={veiculo.marca} />
          </div>
          <div>
            <label htmlFor="modelo">Modelo: </label>
            <input type="text" name="modelo" id="modelo" defaultValue={veiculo.modelo} />
          </div>
          <div>
            <label htmlFor="ano">Ano: </label>
            <input type="number" name="ano" id="ano" min="1000" max="9999" step="1" defaultValue={veiculo.ano} />
          </div>
          <div>
            <label htmlFor="precoDia">Preço do dia: </label>
            <input type="number" name="precoDia" id="precoDia" min="1" step="1" defaultValue={veiculo.precoDia} />
          </div>
          <div>
            <button type="submit">Editar veiculo</button>
          </div>

        </form>
      </div>
    )
}

export default EditarVeiculo