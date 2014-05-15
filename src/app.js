var http = require('http');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var db;

app.use(bodyParser());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

var config = {      
	"USER": "",
	"PASS": "",
	"HOST": "ec2-54-178-129-235.ap-northeast-1.compute.amazonaws.com", 
	"PORT": "27017",      
	"DATABASE": "my_example"  
};

var dbPath = "mongodb://" + config.USER + ":" +
config.PASS + "@" +
config.HOST + ":" +
config.PORT + "/" +
config.DATABASE;



var attendSchema = mongoose.Schema({  
	name: String,
	companyName: String,
	address: String,
	phoneNumber: String,
	email: String,
	attendance: String,
	comment: String
}); 

var Attendee = mongoose.model('Attendee', attendSchema);
db = mongoose.connect(dbPath);

mongoose.connection.on('error', function(err){
	console.log('database connect error: ' + err);
});

app.get('/', function(req, res) {
	res.render('index.html');
});

app.post('/register', function(req, res) {
	console.log('Request: ', req.body);
	var registeredUser = new Attendee({
		name: req.body.name,
		companyName: req.body.companyName,
		addreqs: req.body.addreqs,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		attendance: req.body.attendance,
		comment: req.body.comment
	});

	registeredUser.save(function(err, thor) {
		console.log('Just saved document: ' + thor)
	});
});

app.use(function(err, req, res, next) {
	if(req.xhr) {
		res.send(500, 'Something went wrong!');
	} else {
		next(err);
	}
});

console.log('start');
app.listen(8080);
console.log('listening');