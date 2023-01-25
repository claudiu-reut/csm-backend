const Sequelize = require('sequelize')

module.exports = sequelize.define(
  'Personal',
  {
    id_personal: {
      type: Sequelize.INTEGER(3),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nume: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    prenume: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    data_nasterii: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    descriere: {
      type: Sequelize.STRING(500),
    },
    post: {
      type: Sequelize.STRING(40),
    },
    lot_curent: {
      type: Sequelize.STRING(40),
    },
    id_echipa: {
      type: Sequelize.INTEGER(4),
    },
    tip_personal: {
      type: Sequelize.STRING(40),
      allowNull: false,
      validate: {
        isIn: [['seniori', 'antrenor', 'cadeti', 'sperante', 'juniori']],
      },
    },
    imagine: {
      type: Sequelize.BLOB('medium'),
    },
    inaltime: {
      type: Sequelize.STRING(10),
    },
    gen: {
      type: Sequelize.STRING(20),
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  { freezeTableName: true }
)
