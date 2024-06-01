const express = require('express');
const router = express.Router();
const client = require('../db');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).send('Error al ejecutar la consulta');
  }
});

// Insertar un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { telefono, email, nombre } = req.body;
    const result = await client.query(
      'INSERT INTO usuario (telefono, email, nombre) VALUES ($1, $2, $3) RETURNING *',
      [telefono, email, nombre]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).json({ message: 'Error al insertar datos' });
  }
});

// Actualizar un usuario
router.put('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  const { telefono, email, nombre } = req.body;
  try {
    const result = await client.query(
      'UPDATE usuario SET telefono = $2, email = $3, nombre = $4 WHERE id_usuario = $1 RETURNING *',
      [id_usuario, telefono, email, nombre]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar el usuario', err);
    res.status(500).send('Error al actualizar el usuario');
  }
});

// Eliminar un usuario
router.delete('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    await client.query('DELETE FROM usuario WHERE id_usuario = $1', [id_usuario]);
    res.send('Usuario eliminado');
  } catch (err) {
    console.error('Error al eliminar el usuario', err);
    res.status(500).send('Error al eliminar el usuario');
  }
});

module.exports = router;