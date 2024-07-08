const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const connection = require('../db')

// Ruta para obtener todos los usuarios
usersRouter.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios';
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
usersRouter.post('/', async (req, res) => {
  try {
    const { nom, apellido, email, fecha_nac, telefono, cursos_interes, fk_nivel, passwordHash, fk_rol } = req.body;
    const saltRounds = 10
    //console.log(passwordHash)
    const password = await bcrypt.hash(passwordHash, saltRounds)
    //console.log(password)
  
    const query = 'INSERT INTO usuarios (nom, apellido, email, fecha_nac, telefono, cursos_interes, fk_nivel, password, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await connection.query(query, [nom, apellido, email, fecha_nac, telefono, cursos_interes, fk_nivel, password, fk_rol], (error, results) => {
    res.json({ id: results.insertId, ...req.body })
    })
  }catch (error) {
    console.error('Error ejecutando la consulta:', error)
    res.status(500).send('Error al crear el usuario')
  }
})

// Ruta para actualizar un usuario existente
usersRouter.put('/:id', (req, res) => {
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
    const query = `UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`;
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
usersRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
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

module.exports = usersRouter