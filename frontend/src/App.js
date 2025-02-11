import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './screens/Home';
import CriarVeiculo from './screens/CriarVeiculo';
import Veiculos from './screens/Veiculos';
import Locacoes from './screens/Locacoes';
import MinhasLocacoes from './screens/MinhasLocacoes';
import Header from './components/Header';
import { GlobalStorage } from './context/GlobalContext';
import Login from './screens/Login';
import CriarConta from './screens/CriarConta';

function App() {

  return (
    <div className='container'>


      <BrowserRouter>
        <GlobalStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criar-conta" element={<CriarConta />} />
            <Route path="veiculos" element={<Veiculos />}>
              <Route path="criar" element={<CriarVeiculo />} />
            </Route>
            <Route path="locacoes" element={<Locacoes />}>
              <Route path="minhas-locacoes" element={<MinhasLocacoes />} />
            </Route>
          </Routes>
        </GlobalStorage>
      </BrowserRouter>
    </div>



  );
}

export default App;
