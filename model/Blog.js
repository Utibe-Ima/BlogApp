
module.exports = function (sequelize, DataTypes) {
	const Blog = sequelize.define("Blog Post", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		writer: {
			type: DataTypes.STRING
		},
		body: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})
	return Blog;
}

