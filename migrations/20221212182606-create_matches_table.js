'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('matches', {  
        id: {
        type: Sequelize.INTEGER(5),
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      campionship: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      score: {
        type: Sequelize.STRING(100),
      },
      firstTeam:{
        type: Sequelize.INTEGER(4)
      },
      secondTeam:{
        type: Sequelize.INTEGER(4)
      },
      location:{
        type: Sequelize.STRING(200)
      },
      description:{
        type: Sequelize.STRING(2000)
      },
      gender:{
        type:Sequelize.STRING(30),
        validate:{isIn:[["masculin","feminin"]]}
      },
      division:{
        type: Sequelize.STRING(500)
      },
      sets:{
        type: Sequelize.STRING(500)
      },
      createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
     
  }
};
