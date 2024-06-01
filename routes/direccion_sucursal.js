const express = require('express');
const router = express.Router();
const client = require('../db');

// Obtener todas las direcciones de sucursales
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM direccion_sucursal');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).send('Error al ejecutar la consulta');
  }
});

// Insertar una nueva dirección de sucursal
router.post('/', async (req, res) => {
  try {
    const { calle, comuna, barrio, ciudad, id_sucursal } = req.body;
    const result = await client.query(
      'INSERT INTO direccion_sucursal (calle, comuna, barrio, ciudad, id_sucursal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [calle, comuna, barrio, ciudad, id_sucursal]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).json({ message: 'Error al insertar datos' });
  }
});

// Actualizar una dirección de sucursal
router.put('/:id_direccion', async (req, res) => {
  const { id_direccion } = req.params;
  const { calle, comuna, barrio, ciudad, id_sucursal } = req.body;
  try {
    const result = await client.query(
      'UPDATE direccion_sucursal SET calle = $2, comuna = $3, barrio = $4, ciudad = $5, id_sucursal = $6 WHERE id_direccion = $1 RETURNING *',
      [id_direccion, calle, comuna, barrio, ciudad, id_sucursal]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar la dirección de sucursal', err);
    res.status(500).send('Error al actualizar la dirección de sucursal');
  }
});

// Eliminar una dirección de sucursal
router.delete('/:id_direccion', async (req, res) => {
  const { id_direccion } = req.params;
  try {
    await client.query('DELETE FROM direccion_sucursal WHERE id_direccion = $1', [id_direccion]);
    res.send('Dirección de sucursal eliminada');
  } catch (err) {
    console.error('Error al eliminar la dirección de sucursal', err);
    res.status(500).send('Error al eliminar la dirección de sucursal');
  }
});

module.exports = router;
