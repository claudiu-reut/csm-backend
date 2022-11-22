'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.createTable("posts",{
    id_postare: {
      type: Sequelize.INTEGER(8),
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
    titlu: {
      type: Sequelize.STRING(100),
      allowNull:false
    },
    descriere: {
      type: Sequelize.STRING(5000),
      allowNull:false
    },
    tags: {
      type: Sequelize.STRING(80),
    },
    data: {
      type: Sequelize.DATE,
      allowNull:false
    },
    linkExtern:{
      type: Sequelize.STRING(500),
    },
   user_id:{
      type: Sequelize.INTEGER(3),
      allowNull:false,
   },
   createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
   })
  },

  async down (queryInterface, Sequelize) {
     queryInterface.dropTable("posts");
    
  }
};
