const Sequelize =require("sequelize");

const sequelize = new Sequelize('csm_suceava','root','rootuser',{host:'localhost', dialect:'mysql', port:'3306'});

module.exports=sequelize;
global.sequelize = sequelize;