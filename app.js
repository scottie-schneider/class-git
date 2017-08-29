//andys first commit

let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

//im here 🐙

// mongodb connection
mongoose.connect("mongodb://localhost:27017/classGrader");
let db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error: Oh noes!'));

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

//serve static files from /public
app.use(express.static(__dirname + '/public'));

//view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//include routes 
let routes = require('./routes/index');
app.use('/', routes);

//catch 404 and forward to error handler
app.use(function(req, res, next){
	let err = new Error('File Not Found, Oh noes!');
	err.status = 404;
	next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

//listen on port 3000
app.listen(3000, function (){
	console.log('Express app listening on port 3000');
});

