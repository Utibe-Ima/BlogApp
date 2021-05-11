const { Sequelize } = require('sequelize');
 

 module.exports = new Sequelize('blog', 'root', '', {
 	dialect: 'sqlite',
 	host: 'localhost',
 	storage: 'data/db.sqlite'
 })