const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define("Blog User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM('admin', 'user')
		},
		salt: {
			type: DataTypes.STRING
		}
	}, {
		hooks: {
			beforeValidate: (user, options) => {
				user.email = user.email.toLowerCase();
			},
			beforeCreate: async (user, options) => {
				const salt = await bcrypt.genSalt()
				const hash = await bcrypt.hash(user.password, salt);
				user.password = hash;
				user.salt = salt;
			}
		}
	})
	return User;
}

