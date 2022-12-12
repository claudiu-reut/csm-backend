const  Sequelize =require("sequelize");
 module.exports = sequelize.define("Post",{
    id_postare: {
        type: Sequelize.INTEGER(8),
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
      },
      titlu: {
        type: Sequelize.STRING(200),
        allowNull:false,
        unique: true
      },
      descriere: {
        type: Sequelize.STRING(5000),
        allowNull:false
      },
      tags: {
        type: Sequelize.STRING(80),
      },
  
      linkExtern:{
        type: Sequelize.STRING(500),
      },
      linkImg:{
        type: Sequelize.STRING(500)
      },
     user_id:{
        type: Sequelize.INTEGER(3),
        allowNull:false,
     },
     createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
 });