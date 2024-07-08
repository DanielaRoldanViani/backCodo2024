const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,           // Actualizar host a la dirección del servidor
  user: process.env.MYSQL_ADDON_USER,           // Usuario de la base de datos
  password: process.env.MYSQL_ADDON_PASSWORD,   // Contraseña de la bse de datos        
  database: process.env.MYSQL_ADDON_DB,         // Nombre de la base de datos
  port: process.env.MYSQL_ADDON_PORT,
  connectTimeout: 5000,                         // Tiempo de espera de 3 segundos
  //debug: true                                 // Habilitar depuración
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
