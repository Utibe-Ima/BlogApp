require('dotenv').config();

const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const router = express.Router();
const db = require('../config/database.js');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isLoggedIn = require('../middleware/isLoggedIn').login
const authMiddleware = require('../middleware/authentication').authToken;
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(authMiddleware);
app.use(isLoggedIn)

// Login Route

// Login Form
router.get('/login', (req, res) => {
	res.render("login")
})



router.post('/login', (req, res) => {
	const user = db.user;
	db.user
		.findOne({ where: { email: req.body.email } })
		.then((user) => {
			bcrypt.compare(req.body.password, user.password)
				.then((result) => {
					if (result === false) {
						res.send('Incorrect Password')
					} else {
						res.redirect('/')
					}
				})
		})
		.catch((err) => {
			console.log(err)
		});

	jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" }, (err, authData) => {
		res.cookie('authData', authData, {
			httpOnly: true,
			secure: true
		})
	});
})



// Registration routes
// Registration form
router.get('/register', (req, res) => {
	res.render("register");
})

// Registration route
router.post('/register', (req, res) => {
	db.user
		.create(req.body)
		.then(() => {
			res.redirect('/login')
		})
		.catch((err) => {
			console.log(err)
		})
})


// Index route
router.get('/', isLoggedIn,(req, res) => {
	res.render('index', { layout: 'landing' });
})

// ================ view all blog posts =====================
router.get('/all', isLoggedIn, authMiddleware,  (req, res) => {
	db.blog
		.findAll()
		.then((allPost) => {
			res.render("blogs", {
				allPost: allPost.map(post => {
					post = post.toJSON()
					post.links = {
						remove: "/remove/" + post.id,
						update: "/update/" + post.id,
						show: "/blog/" + post.id
					}
					return post
				})
			});
		})
		.catch((err) => {
			console.log(err);
		});
})

// ===================== view one post ======================
router.get('/blog/:id', isLoggedIn,(req, res) => {
	let blogId = req.params.id;
	db.blog.findOne({ where: { id: blogId } })
		.then((show) => {
			res.render("show", {
				show: show.toJSON()
			})
		})
		.catch((err) => {
			console.log(err);
		});
})

// ==================== create new blog post =======================


// ============== form for new blog ==================
router.get('/add', (req, res) => {
	res.render("add");
})

// ================== add a blog post ======================
router.post('/add', isLoggedIn,(req, res) => {


	jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403)
		} else {
			db.user
				.create(req.body)
				.then(() => {
					res.redirect('/all')
					console.log(authData)
				})
				.catch((err) => {
					console.log(err)
				});
		}
	})
})

// ==================update a blog post ==================
// ======= update form ===============
router.get('/update/:id', (req, res) => {
	const updateId = req.params.id;
	db.blog.findOne({ where: { id: updateId } })
		.then((update) => {
			res.render('update', {
				update: update.toJSON()
			});
		}).catch((err) => {
			console.log(err)
		})

})

router.put('/update/:id', isLoggedIn,(req, res) => {
	const updateId = req.params.id;
	db.blog.findOne({ where: { id: updateId } })
		.then((update) => {

		}).catch((err) => {
			console.log(err)
		})

})

// ==================== delete a blog ====================
router.delete('/remove/:id', isLoggedIn,(req, res) => {
	const removeId = req.params.id;
	db.blog.destroy({ where: { id: removeId } })
		.then(() => {
			res.redirect('/all')
		}).catch((err) => {
			console.log(err)
		});
});

// ================ search for a blog ========================
router.get('/search', isLoggedIn, function (req, res) {
	let blogSearch = req.query.search;
	blogSearch = blogSearch.toLowerCase()
	db.blog.findAll({
		where: {
			[Op.or]: [
				{ title: { [Op.like]: '%' + blogSearch + '%' } },
				{ writer: { [Op.like]: '%' + blogSearch + '%' } },
				{ body: { [Op.like]: '%' + blogSearch + '%' } }
			]
		}
	})
		.then((searchResult) => {
			res.render("search", {
				searchResult: searchResult.map(result => {
					result = result.toJSON()
					result.links = {
						show: "/blog/" + result.id
					}
					return result
				})
			})

		})
		.catch((err) => {
			console.log(err)
		});

});



module.exports = router;