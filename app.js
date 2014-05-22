var http = require('http');
var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');
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

var connection = mongoose.createConnection(dbPath);

connection.on('error', function(err){
	console.log('database connect error: ' + err);
});

var models = require('./models');
function db (req, res, next) {
	req.db = {
		User: connection.model('User', models.User, 'users'),
	};
	return next();
}

app.get('/', routes.index);

app.post('/register', routes.register, db);

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