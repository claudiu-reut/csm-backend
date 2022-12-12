const  Sequelize =require("sequelize");
 module.exports = sequelize.define("Teams",{
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
    updatedAt: Sequelize.DATE
 });
