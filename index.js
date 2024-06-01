const express = require('express');
const path = require('path'); // Importa el módulo 'path'
const client = require('./db'); // Importa la conexión a la base de datos

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Archivos estáticos
app.use(express.static(__dirname));


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

// Ruta para mostrar el formulario de cliente
app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/clienteForm.html')); // Corregido el camino del archivo
});

// Ruta para manejar el envío del formulario de cliente
app.post('/cliente', async (req, res) => {
  const { telefono, email, nombre } = req.body;
  try {
    await client.query('INSERT INTO Cliente (telefono, email, nombre) VALUES ($1, $2, $3)', [telefono, email, nombre]);
    res.send('Cliente registrado correctamente.');
  } catch (err) {
    console.error('Error al registrar cliente:', err);
    res.status(500).send('Error del servidor');
  }
});

// Inicia el servidor
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
