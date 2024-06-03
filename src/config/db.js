const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('text', 'EDINSON', 'ED', {
  host: 'db',
  dialect: 'postgres',
  port: 5432
});

module.exports = sequelize;
