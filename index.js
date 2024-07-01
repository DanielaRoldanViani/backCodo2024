require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./db')

// Middleware para analizar datos URL-encoded y JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('<h1>¡Bienvenido a mi aplicación Node.js con Express y MySQL!<h1>');
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error al obtener los usuarios');
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener todos los usuarios
app.get('/roles', (req, res) => {
  const query = 'SELECT * FROM roles';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error al obtener los usuarios');
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener todos los usuarios
app.get('/niveles', (req, res) => {
  const query = 'SELECT * FROM niveles';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error al obtener los usuarios');
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener todos los usuarios
app.get('/cursos', (req, res) => {
  const query = 'SELECT * FROM cursos';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error al obtener los usuarios');
      return;
    }
    res.json(results);
  });
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { fname, lname, email, birthday, telefono, interes, level } = req.body;
  const query = 'INSERT INTO users (fname, lname, email, birthday, telefono, interes, level) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [fname, lname, email, birthday, telefono, interes, level], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error al crear el usuario');
      return;
    }
    res.json({ id: results.insertId, ...req.body });
  });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Inicio del servidor
const portServer = process.env.PORT_SERVER || 3001
app.listen(portServer, () => {
  console.log(`Servidor corriendo en el puerto: ${portServer}`);
});
