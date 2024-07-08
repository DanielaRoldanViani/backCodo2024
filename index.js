require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const connection = require('./db')

// Middleware para analizar datos URL-encoded y JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersRouter = require('./controllers/usuarios')
const rolesRouter = require('./controllers/roles')
const nivelesRouter = require('./controllers/niveles')
const cursosRouter = require('./controllers/cursos')

// Ruta principal
app.get('/', (req, res) => {
  res.send('<h1>¡Bienvenido al Backend AcademyCode realizado con Node.js con Express y MySQL!<h1>');
});

app.use('/usuarios', usersRouter)

app.use('/roles', rolesRouter)

app.use('/niveles', nivelesRouter)

app.use('/cursos', cursosRouter)

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