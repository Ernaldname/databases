const express = require('express');
const db = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/usuarios', require('./src/routes/usuario'));
// ... (resto de las rutas)

// Inicia el servidor
app.listen(PORT, async () => {
  try {
    // La conexión a la base de datos se establece automáticamente cuando interactúas con los modelos

    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
});
