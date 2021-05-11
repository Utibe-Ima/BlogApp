const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database.js');

const Blog = db.define('blog', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		default: 'My Blog Post'
	},
	writer: {
		type: DataTypes.STRING
	},
	body: {
		type: DataTypes.STRING,
		allowNull: false
	},
	image: {
		type: DataTypes.STRING
	}
})


module.exports = Blog