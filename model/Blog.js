module.exports = function (sequelize, DataTypes) {
	const model = sequelize.define("blog-posts", {
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
	return model;
}

