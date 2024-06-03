const Usuario = require('../models/usuario');

// Controlador para obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    // Consultar todos los usuarios utilizando Sequelize
    const usuarios = await Usuario.findAll();
    // Enviar los resultados como respuesta
    res.json(usuarios);
  } catch (err) {
    // Enviar un mensaje de error si la consulta falla
    console.error('Error al obtener usuarios de la base de datos:', err);
    res.status(500).json({ error: 'Error al obtener usuarios de la base de datos' });
  }
};

// Controlador para crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  const { telefono, email, nombre } = req.body;
  try {
    // Crear un nuevo usuario utilizando Sequelize
    const usuario = await Usuario.create({ telefono, email, nombre });
    // Enviar el usuario creado como respuesta
    res.status(201).json(usuario);
  } catch (err) {
    // Enviar un mensaje de error si la creación falla
    console.error('Error al crear el usuario en la base de datos:', err);
    res.status(500).json({ error: 'Error al crear el usuario en la base de datos' });
  }
};
