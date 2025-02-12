import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const userStorage = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null
  const [user, setUser] = React.useState(userStorage);
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {

    if (!user && location.pathname !== '/login' && location.pathname !== '/criar-conta' && !userStorage)
      navigate('/login')
  }, [location.pathname])

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
