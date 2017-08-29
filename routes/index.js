let express = require('express');
let router = express.Router();
let User = require('../models/user');

// GET 
router.get('/hosed', function(req,res,next){
	return res.send('Scottie is hosed');
})
// GET /Register
router.get('/register', function(req,res,next) {

	return res.render('register', { title: 'Sign Up' })
});

// GET /nope
router.get('/nope', function(req,res,next){
	return res.render('nope', {title: 'Nope'});
})
// POST /register
router.post('/register', function(req,res,next){
	if(req.body.email &&
		req.body.name &&
		req.body.cohort &&
		req.body.password &&
		req.body.confirmPassword){
		// confirm that user typed same password twice
		if(req.body.password !== req.body.confirmPassword){
			let err = new Error('Oh noes! Password do not match');
			err.status = 400;
			return next(err);
		}
		//create object with form input
		let userData = {
			email: req.body.email,
			name: req.body.name,
			cohort: req.body.cohort,
			password: req.body.password
		}
		// use schema's 'create' method to insert document into Mongo
		User.create(userData, function(error, user){
			if(error){
				return next(error);
			}else if (req.body.name == 'Drake'){
				return res.render('nope');
			}else{
				return res.redirect('/profile');
			}
		});

	}else{
		let err = new Error('Oh noes! All fields required!');
		err.status = 400;
		return next(err);
	}
})

// GET /
router.get('/', function (req, res, next) {
	return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next){
	return res.render('about', {title: 'About'});
});

// GET /contact
router.get('/contact', function(req, res, next){
	return res.render('contact', { title: 'Contact' });
})

module.exports = router;