const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const {Sequelize} = require('sequelize');
const db = require('./config/database.js');
const blog = require('./model/Blog.js');


app.use(express.json());
app.use(express.urlencoded({extended: false}));












const PORT = process.env.PORT || 5000;

db.sync()
.then(() => {
	app.listen(PORT, () => {
	console.log(`App is running on Port ${PORT}`)
	})	
})
.catch((err) => {
	console.log(err)
})

