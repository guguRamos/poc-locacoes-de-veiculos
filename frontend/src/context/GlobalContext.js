import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {

    if (!user)
      navigate('/login')
  }, [location.pathname])

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
