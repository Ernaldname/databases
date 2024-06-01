const express = require('express');
const router = express.Router();
const client = require('../db');

// Obtener todas las sucursales
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM sucursal');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).send('Error al ejecutar la consulta');
  }
});

// Insertar una nueva sucursal
router.post('/', async (req, res) => {
  try {
    const { telefono, nombre, id_cliente } = req.body;
    const result = await client.query(
      'INSERT INTO sucursal (telefono, nombre, id_cliente) VALUES ($1, $2, $3) RETURNING *',
      [telefono, nombre, id_cliente]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).json({ message: 'Error al insertar datos' });
  }
});

// Actualizar una sucursal
router.put('/:id_sucursal', async (req, res) => {
  const { id_sucursal } = req.params;
  const { telefono, nombre, id_cliente } = req.body;
  try {
    const result = await client.query(
      'UPDATE sucursal SET telefono = $2, nombre = $3, id_cliente = $4 WHERE id_sucursal = $1 RETURNING *',
      [id_sucursal, telefono, nombre, id_cliente]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar la sucursal', err);
    res.status(500).send('Error al actualizar la sucursal');
  }
});

// Eliminar una sucursal
router.delete('/:id_sucursal', async (req, res) => {
  const { id_sucursal } = req.params;
  try {
    await client.query('DELETE FROM sucursal WHERE id_sucursal = $1', [id_sucursal]);
    res.send('Sucursal eliminada');
  } catch (err) {
    console.error('Error al eliminar la sucursal', err);
    res.status(500).send('Error al eliminar la sucursal');
  }
});

module.exports = router;