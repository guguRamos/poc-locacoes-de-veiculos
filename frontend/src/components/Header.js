import React, { useContext } from 'react'
import styles from './Header.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { setUser } = useContext(GlobalContext)
  if (location.pathname !== '/login' && location.pathname !== '/criar-conta')
    return (
      <div className={styles.divMain}>
        <h1 >POC Locações de veiculos</h1>
        <nav>
          <ul style={{ listStyle: 'none' }}>
            <li
              style={{ cursor: 'pointer' }}
            >
              <a onClick={() => navigate("/")}>
                Home
              </a>
            </li>
            <li

              style={{ cursor: 'pointer' }}
            >
              <a onClick={() => navigate("/veiculos")}>
                Veiculos
              </a>
            </li>
            <li
              style={{ cursor: 'pointer' }}
            >
              <a onClick={() => navigate("/locacoes/minhas-locacoes")}>
                Minhas locações
              </a>
            </li>
            <li
              style={{ cursor: 'pointer' }}
            >
              <a onClick={() => {
                setUser(null)
                navigate("/login")
              }}>
                Sair da conta
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
}

export default Header