const  Sequelize =require("sequelize");
 module.exports = sequelize.define("Sponsors",{
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
      },
      linkImagine:{
        type: Sequelize.STRING(500),
        allowNull:false
      },
 });
