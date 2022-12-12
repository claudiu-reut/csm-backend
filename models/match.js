const  Sequelize =require("sequelize");
 module.exports = sequelize.define("Matches",{
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
      createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
 });
