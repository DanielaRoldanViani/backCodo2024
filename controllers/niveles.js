const nivelesRouter = require('express').Router()
const connection = require('../db')

// Ruta para obtener todos los usuarios
nivelesRouter.get('/', (req, res) => {
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

module.exports = nivelesRouter