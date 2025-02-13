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
        <nav style={{ width: "100%" }}>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', backgroundColor: "#ddd", width: "100%", padding: '12px 24px', borderRadius: "8px" }}>
            <li
              style={{ cursor: 'pointer', color: "#00f", textDecoration: 'underline' }}
            >
              <a onClick={() => navigate("/veiculos")}>
                Veiculos
              </a>
            </li>
            <li
              style={{ cursor: 'pointer', color: "#00f", textDecoration: 'underline' }}
            >
              <a onClick={() => navigate("/locacoes/minhas-locacoes")}>
                Minhas locações
              </a>
            </li>
            <li
              style={{ cursor: 'pointer', color: "#00f", textDecoration: 'underline' }}
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