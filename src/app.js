var http = require('http');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
var db;

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
		name: req.name,
		companyName: req.companyName,
		addreqs: req.addreqs,
		phoneNumber: req.phoneNumber,
		email: req.email,
		attendance: req.attendance,
		comment: req.comment
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