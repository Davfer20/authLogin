import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Formulario } from './components/form';
import { Autenticado } from './components/autenticado';
import React from 'react';

// Funcion principal
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/authenticated" element={<Autenticado />} />
      </Routes>
    </Router>
  );
}

export default App;
