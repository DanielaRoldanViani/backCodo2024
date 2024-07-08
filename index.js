require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./db')
const bcrypt = require('bcrypt')

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

// Ruta para registrar un nuevo usuario (se utiliza bcrypt para guardar contraseña codificada en BD)
app.post('/users', async (req, res) => {
  try {
    const { nom, apellido, email, fecha_nac, telefono, cursos_interes, fk_nivel, passwordHash, fk_rol } = req.body;
    const saltRounds = 10
    //console.log(passwordHash)
    const password = await bcrypt.hash(passwordHash, saltRounds)
    //console.log(password)
  
    const query = 'INSERT INTO users (nom, apellido, email, fecha_nac, telefono, cursos_interes, fk_nivel, password, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await connection.query(query, [nom, apellido, email, fecha_nac, telefono, cursos_interes, fk_nivel, password, fk_rol], (error, results) => {
    res.json({ id: results.insertId, ...req.body })
    })
  }catch (error) {
    console.error('Error ejecutando la consulta:', error)
    res.status(500).send('Error al crear el usuario')
  }
})

// Ruta para actualizar un usuario existente
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  // Añade dinámicamente los campos y valores proporcionados en el request body
  for (let [key, value] of Object.entries(req.body)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  // Añade el ID del usuario al final de los valores
  values.push(id);

  if (fields.length > 0) {
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id_usuario = ?`;
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error ejecutando la consulta:', error);
        res.status(500).send('Error al actualizar el usuario');
        return;
      }
      res.json({ message: 'Usuario actualizado exitosamente', results });
    });
  } else {
    res.status(400).send('No se proporcionaron campos para actualizar');
  }
});

// Ruta para eliminar un usuario existente
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id_usuario = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error al eliminar el usuario');
      return;
    }
    //res.json({ message: 'Usuario eliminado exitosamente', results });
    res.status(204).end();
  });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Inicio del servidor
const portServer = process.env.PORT_SERVER || 3000
app.listen(portServer, () => {
  console.log(`Servidor corriendo en el puerto: ${portServer}`);
});