const cursosRouter = require('express').Router()
const connection = require('../db')

// Ruta para obtener todos los usuarios
cursosRouter.get('/', (req, res) => {
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

module.exports = cursosRouter