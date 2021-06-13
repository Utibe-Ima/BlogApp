const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const http = require('http');
const db = require('./config/database.js');
const methodOverride = require('method-override');


app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));


app.enable('view cache');
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes goes below this line
const Router = require('./routes/routes');
app.use('/', Router);












//Create and Listen to the Server 

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

db.sequelize
.sync()
.then(() => {
	server.listen(PORT);
})
.catch((err) => {
	console.log(err);
})