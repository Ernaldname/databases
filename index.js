const express = require('express');
const app = express();
const port = 3000;
const client = require('./db'); // Importa la conexión a la base de datos

// Middleware para parsear JSON
app.use(express.json());

// Archivos estáticos
app.use(express.static('public'));

// Rutas
const clienteRoutes = require('./routes/cliente');
const usuarioRoutes = require('./routes/usuario');
const sucursalRoutes = require('./routes/sucursal');
const direccionSucursalRoutes = require('./routes/direccion_sucursal');

app.use('/cliente', clienteRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/sucursal', sucursalRoutes);
app.use('/direccion_sucursal', direccionSucursalRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Manejo de la desconexión de la base de datos
process.on('SIGINT', () => {
  console.log('Cerrando conexión a la base de datos');
  client.end()
    .then(() => console.log('Conexión cerrada correctamente'))
    .catch(err => console.error('Error al cerrar la conexión', err))
    .finally(() => process.exit());
});