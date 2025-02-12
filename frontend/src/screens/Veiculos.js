import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Veiculos = () => {
  const navigate = useNavigate()
  return (
    <div style={{ padding: '0 0 92px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button onClick={() => navigate('/veiculos/criar')}>Criar veiculo</button>
        <button onClick={() => navigate('/veiculos/listar')}>Listar veiculos</button>
      </div>
      <div style={{ marginTop: '32px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Veiculos