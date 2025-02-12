import React from 'react'
import { useNavigate } from 'react-router-dom';

const CriarVeiculo = () => {
  const navigate = useNavigate();


  async function handleSubmit(event) {
    event.preventDefault()

    const marca = event.target.marca.value;
    const modelo = event.target.modelo.value;
    const ano = event.target.ano.value;
    const precoDia = event.target.precoDia.value;


    const response = await fetch('http://localhost:3000/veiculos/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ marca, modelo, ano, precoDia }),
    });

    if (!response.ok) {
      throw new Error('Erro no criar veiculo');
    }

    await response.json();


    navigate('/veiculos')
  }

  return (
    <div>
      <h2>Criando veiculo</h2>

      <form action="#" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="marca">Marca: </label>
          <input type="text" name="marca" id="marca" />
        </div>
        <div>
          <label htmlFor="modelo">Modelo: </label>
          <input type="text" name="modelo" id="modelo" />
        </div>
        <div>
          <label htmlFor="ano">Ano: </label>
          <input type="number" name="ano" id="ano" min="1000" max="9999" step="1" />
        </div>
        <div>
          <label htmlFor="precoDia">Preço do dia: </label>
          <input type="number" name="precoDia" id="precoDia" min="1" step="1" />
        </div>
        <div>
          <button type="submit">Criar veiculo</button>
        </div>

      </form>
    </div>
  )
}

export default CriarVeiculo