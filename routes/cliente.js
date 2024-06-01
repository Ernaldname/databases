const express = require('express');
const router = express.Router();
const client = require('../db'); // Asegúrate de que esta ruta sea correcta

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM cliente');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).send('Error al ejecutar la consulta');
  }
});

// Insertar un nuevo cliente
router.post('/', async (req, res) => {
 try {
   const { telefono, email, nombre } = req.body;
   const result = await client.query(
     'INSERT INTO cliente (telefono, email, nombre) VALUES ($1, $2, $3) RETURNING id_cliente, telefono, email, nombre',
     [telefono, email, nombre]
   );
   res.status(200).json(result.rows[0]);
 } catch (error) {
   console.error('Error al insertar datos:', error);
   res.status(500).json({ message: 'Error al insertar datos' });
 }
});


// Actualizar un cliente
router.put('/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;
  const { telefono, email, nombre } = req.body;
  try {
    const result = await client.query(
      'UPDATE cliente SET telefono = $2, email = $3, nombre = $4 WHERE id_cliente = $1 RETURNING *',
      [id_cliente, telefono, email, nombre]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar el cliente', err);
    res.status(500).send('Error al actualizar el cliente');
  }
});

// Eliminar un cliente
router.delete('/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;
  try {
    await client.query('DELETE FROM cliente WHERE id_cliente = $1', [id_cliente]);
    res.send('Cliente eliminado');
  } catch (err) {
    console.error('Error al eliminar el cliente', err);
    res.status(500).send('Error al eliminar el cliente');
  }
});

module.exports = router;