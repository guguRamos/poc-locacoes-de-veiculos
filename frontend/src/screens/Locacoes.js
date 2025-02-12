import React from 'react'
import { Outlet } from 'react-router-dom'

const Locacoes = () => {
  return (
    <div style={{ padding: '0 0 92px' }}>
      <h2>Locações</h2>
      <div style={{ marginTop: '32px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Locacoes