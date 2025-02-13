import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { setUser } = useContext(GlobalContext)
  const navigate = useNavigate()


  async function handleSubmit(event) {
    event.preventDefault()

    const email = event.target.email.value;
    const senha = event.target.password.value;

    const response = await fetch('http://localhost:3000/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error('Erro no login');
    }

    const data = await response.json();

    window.localStorage.setItem('user', JSON.stringify(data))
    setUser(data);

    navigate('/veiculos')
  }
  return (
    <div style={{ padding: '64px' }}>
      <h2>Entre na sua conta</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Senha: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <button type="submit">Entrar na conta</button>
        </div>
        <div style={{ marginTop: '24px' }}>
          <a href="/criar-conta">Criar uma conta</a>
        </div>
      </form>
    </div>
  )
}

export default Login