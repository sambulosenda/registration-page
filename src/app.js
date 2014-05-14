var http = require('http');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
var db;

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

var helloGreeting = 'Hello World!';

var greetingSchema = mongoose.Schema({  
	sentence: String
}); 

var Greeting = mongoose.model('Greeting', greetingSchema);
db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {
	var greeting;
	Greeting.find( function(err, greetings) {
		if (!greetings) {
			greeting = new Greeting({sentence: helloGreeting});
			greeting.save();
		}
	});
});

app.get('/', function(req, res) {
	Greeting.findOne(function(err, greeting) {
		res.send(greeting.sentence);
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