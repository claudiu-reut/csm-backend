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
      type: Sequelize.STRING(40),
    },
    editia: {
      type: Sequelize.STRING(40),
      allowNull:false
    }
    
   })
  },

  async down (queryInterface, Sequelize) {
   queryInterface.dropTable("sponsors");
  }
};
