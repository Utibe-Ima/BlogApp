const { Sequelize } = require('sequelize');
const blogModel = require('../model/Blog.js');
const userModel = require('../model/User.js');

 const sequelize = new Sequelize('blog-posts', 'root', '', {
 	dialect: 'sqlite',
 	host: 'localhost',
 	storage: 'data/db.sqlite'
 });




 const db = {};

 db.sequelize = sequelize;
 db.Sequelize = Sequelize;
 db.blog = blogModel(sequelize, Sequelize.DataTypes);
 db.user = userModel(sequelize, Sequelize.DataTypes);

 db.user.hasMany(db.blog);
 db.blog.belongsTo(db.user);

 module.exports = db;