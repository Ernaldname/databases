// En el archivo ./routes/cliente.js
const express = require('express');
const router = express.Router();
const client = require('../db');

router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    const result = await client.query(
      'INSERT INTO cliente (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, telefono]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).json({ message: 'Error al insertar datos' });
  }
});

module.exports = router;
