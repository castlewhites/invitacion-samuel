import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing'; // Ahora Landing será la invitación
import ListaInvitados from './components/GuestList'; // Página con los links personalizados

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lista-invitados" element={<ListaInvitados />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
