import "./form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export function Formulario() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState(""); // Para manejar errores del backend
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || password === "") {
      setError(true);
      return;
    }

    setError(false);

    // Enviar solicitud de login al backend
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, password: password }), // Enviar credenciales
      });

      const data = await response.json();

      if (response.ok) {
        // El login fue exitoso, redirigir al usuario
        navigate("/authenticated");
      } else {
        // Si el backend devuelve un error, mostrarlo
        setLoginError(data.message || "Error en el login");
      }
    } catch (error) {
      setLoginError("No se pudo conectar con el servidor. Inténtalo de nuevo.");
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="error">Both fields are required</div>}
        {loginError && <div className="error">{loginError}</div>} {/* Error del backend */}
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}