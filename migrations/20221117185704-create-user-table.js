'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  queryInterface.createTable("users",{
    id_user: {
      type: Sequelize.INTEGER(3),
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
    firstName: {
      type: Sequelize.STRING(40),
      allowNull:false
    },
    lastName: {
      type: Sequelize.STRING(40),
      allowNull:false
    },
    email: {
      type: Sequelize.STRING(80),
      unique: true,
      allowNull:false,
      validate:{isEmail:true}
    },
    password: {
      type: Sequelize.STRING(80),
      allowNull:false
    },
    role:{
      type: Sequelize.STRING(40),
      allowNull:false,
      validate:{isIn:[["admin","creator"]]}
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
    
  })
  },

  async down (queryInterface, Sequelize) {
   queryInterface.dropTable("users");
  }
};
