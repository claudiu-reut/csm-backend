'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.createTable('teams', { 
        id_echipa: {
        type: Sequelize.INTEGER(4),
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
      },
      tara: {
        type: Sequelize.STRING(100),
        
      },
      oras: {
        type: Sequelize.STRING(100),
      },
      nume: {
        type: Sequelize.STRING(100),
      },
      imagine:{
        type: Sequelize.BLOB('medium')
      },
      createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE });
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.dropTable('teams');
    
  }
};
