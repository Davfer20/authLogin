const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Habilitar JSON parsing

const USERS_FILE = './users.json'; // Archivo JSON donde se guardan los usuarios

// Función para leer usuarios del archivo JSON
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return []; 
  }
};

// Función para escribir usuarios en el archivo JSON
const writeUsersToFile = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
};

// Función para verificar si el usuario ya existe
const isUserExists = (username) => {
  const users = readUsersFromFile();
  return users.find((user) => user.username === username);
};

// Ruta para registrar usuarios
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Leer la lista de usuarios
  const users = readUsersFromFile();

  // Buscar al usuario por nombre de usuario
  const user = users.find(user => user.username === username);

  // Si no se encuentra el usuario, devolver un error
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  // Comparar la contraseña proporcionada con la contraseña almacenada
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Si la contraseña es válida, se puede proceder con el login
  res.json({ message: 'Login successful' });
});

app.get('/users', (req, res) => {
  const users = readUsersFromFile();
  res.json(users); // Devolvemos la lista de usuarios
});


app.listen(4000, () => {
  console.log('Server running on port 4000');
});
