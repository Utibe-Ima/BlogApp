const { Sequelize } = require('sequelize');
const blogModel = require('../model/Blog.js');

 const sequelize = new Sequelize('blog-posts', 'root', '', {
 	dialect: 'sqlite',
 	host: 'localhost',
 	storage: 'data/db.sqlite'
 });



 const db = {};

 db.sequelize = sequelize;
 db.sequelize = Sequelize;
 db.blog = blogModel(sequelize, Sequelize.DataTypes);

 module.exports = db;