import React from 'react'

import { useNavigate } from 'react-router-dom'

const CriarConta = () => {
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const nome = event.target.nome.value;
    const email = event.target.email.value;
    const senha = event.target.password.value;

    if (!nome && !email && !senha)
      throw new Error('Faltam dados')

    const response = await fetch('http://localhost:3000/usuario/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar conta');
    }

    await response.json();

    navigate('/login')
  }

  return (
    <div style={{ padding: '64px' }}>
      <h2>Criar uma conta</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome: </label>
          <input type="text" name="nome" id="nome" />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Senha: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <button type="submit">Criar conta</button>
        </div>
        <div style={{ marginTop: '24px' }}>
          <a href="/login">Entrar em uma conta</a>
        </div>
      </form>
    </div>
  )
}

export default CriarConta