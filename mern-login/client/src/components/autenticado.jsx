import React from 'react';
import './autenticado.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export function Autenticado() {
  const navigate = useNavigate(); // Inicializar useNavigate

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    navigate("/"); // Redirigir al inicio de sesión (ruta "/")
  };

  return (
    <div className="authenticated-container">
      <h1 className="neon-text">Ha sido autenticado, felicidades :)</h1>

      {/* Botón de cerrar sesión */}
      <button className='regreso' onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}