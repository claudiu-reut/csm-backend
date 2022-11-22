'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.createTable("sponsors",{
    id_sponsor: {
      type: Sequelize.INTEGER(3),
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
    denumire: {
      type: Sequelize.STRING(40),
      allowNull:false
    },
    linkSite: {
      type: Sequelize.STRING(500),
    },
    editia: {
      type: Sequelize.STRING(40),
      allowNull:false
    },
    linkImagine:{
      type: Sequelize.STRING(500),
      allowNull:false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
   })
  },

  async down (queryInterface, Sequelize) {
   queryInterface.dropTable("sponsors");
  }
};
