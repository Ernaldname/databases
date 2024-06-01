const { Client } = require('pg');

const client = new Client({
  user: 'EDINSON',
  host: 'db',
  database: 'text',
  password: 'ED',
  port: 5432,
});

client.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos', err));

module.exports = client;