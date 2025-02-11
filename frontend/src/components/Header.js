import React from 'react'
import styles from './Header.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation();
  if (location.pathname !== '/login' && location.pathname !== '/criar-conta')
    return (
      <div className={styles.divMain}>
        <h1 >POC Locações de veiculos</h1>
        <nav>
          <ul style={{ listStyle: 'none' }}>
            <li
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              Home
            </li>
            <li
              onClick={() => navigate('/veiculos')}
              style={{ cursor: 'pointer' }}
            >
              Veiculos
            </li>
            <li
              onClick={() => navigate('/locacoes/minhas-locacoes')}
              style={{ cursor: 'pointer' }}
            >
              Minhas locações
            </li>
          </ul>
        </nav>
      </div>
    )
}

export default Header