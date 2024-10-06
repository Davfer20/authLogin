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

  // Llamar a la función para validar si el usuario ya existe
  if (isUserExists(username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };

  const users = readUsersFromFile();
  users.push(newUser);
  writeUsersToFile(users);

  res.json({ message: 'User registered successfully' });
});

app.get('/users', (req, res) => {
  const users = readUsersFromFile();
  res.json(users); // Devolvemos la lista de usuarios
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});
