'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('matches', {  
        id_meci: {
        type: Sequelize.INTEGER(5),
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
      },
      data: {
        type: Sequelize.DATE,
        allowNull:false
      },
      campionat: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      rezultat: {
        type: Sequelize.STRING(100),
      },
      id_echipa1:{
        type: Sequelize.INTEGER(4)
      },
      id_echipa2:{
        type: Sequelize.INTEGER(4)
      },
      locatia:{
        type: Sequelize.STRING(200)
      },
      description:{
        type: Sequelize.STRING(2000)
      },
      gen:{
        type:Sequelize.STRING(30),
        validate:{isIn:[["masculin","feminin"]]}
      },
      description:{
        type: Sequelize.STRING(2000)
      },
      sets:{
        type:Sequelize.STRING(200)
      },
      divizia:{
        type:Sequelize.STRING(500)
      },
      createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
     
  }
};
