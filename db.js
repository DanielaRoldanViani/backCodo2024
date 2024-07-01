// db.js

// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'tu_usuario',
//   password: '',
//   database: 'codo-a-codo'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error de conexión a la base de datos:', err.stack);
//     return;
//   }
//   console.log('Conexión exitosa a la base de datos MySQL.');
// });

// module.exports = connection;

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Asegúrate de que la contraseña es correcta, aquí es vacía
  database: 'codo-a-codo'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL.');
});

module.exports = connection;
