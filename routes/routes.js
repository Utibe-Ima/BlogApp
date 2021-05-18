const express = require('express');
const router = express.Router();
const db = require('../config/database.js');



// Home Page




// ================ view all blog posts =====================
router.get('/all', (req, res) => {
	db.blog.findAll()
	.then((allPost) => {
		res.render("blogs", {
			allPost: allPost.map(post=>{
				post = post.toJSON()
				post.links = {
					remove: "/remove/"+post.id,
					update: "/update/"+post.id
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
router.get('/blog/:id', (req, res) => {
	let blogId = req.params.id;
	db.blog.findOne({where: {id: blogId}})
	.then(() => {
		res.render("show")
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
router.post('/add', (req, res) => {
	db.blog.create(req.body)
	.then(() => {
		res.redirect('/all');
	})
	.catch((err) => {
		console.log(err)
	});
})

// ==================update a blog post ==================
// ======= update form ===============
router.get('/update/:id/edit', (req, res) => {
	res.render('update');
})

router.put('/update/:id', async (req, res) => {
	const updateId = req.params.id;
	const updateBlog = db.blog.findOne({where: {id: updateId}});
	updateBlog.title = req.body.title;
	updateBlog.writer = req.body.writer;
	updateBlog.body = req.body.body;
	await updateBlog.save();
})

// ==================== delete a blog ====================
router.delete('/remove/:id', (req, res) => {
	const removeId = req.params.id;
	db.blog.destroy({where: {id: removeId}})
	.then(() => {
		res.redirect('/all')
	}).catch((err) => {
		console.log(err)
	});
});





module.exports = router;