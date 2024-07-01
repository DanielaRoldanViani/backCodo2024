const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.HOST_DB,          // Actualizar host a la dirección del servidor
  user: process.env.USER_DB,          // Usuario de la base de datos
  password: process.env.PASSWORD_DB,  // Contraseña de la bse de datos        
  database: process.env.DATABASE,     // Nombre de la base de datos
  connectTimeout: 3000,               // Tiempo de espera de 3 segundos
  //debug: true                         // Habilitar depuración
});

// Conexión a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL.');
});

module.exports = connection;
