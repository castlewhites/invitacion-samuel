import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing'; // Ahora Landing será la invitación
import ListaInvitados from './components/GuestList'; // Página con los links personalizados

function App() {
  return (
    <Router basename="/invitacion-samuel">
      <Routes>
        {/* Lista de invitados */}
        <Route path="/lista-invitados" element={<ListaInvitados />} />
        {/* Invitación personalizada */}
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
