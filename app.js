var http = require('http');
var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');
var models = require('./models');
var bodyParser = require('body-parser');
var partials = require('express-partials')

var app = express();
var db;

app.use(bodyParser());
app.use(partials());
app.use("/public", express.static(__dirname + '/public'));


var config = {      
	"USER": "",
	"PASS": "",
	"HOST": "127.0.0.1", 
	"PORT": "27017",      
	"DATABASE": "registration"  
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

function db (req, res, next) {
	req.db = {
		User: connection.model('User', models.User, 'users')
	};
	return next();
}

app.get('/', routes.index);
app.post('/users', db, routes.users.saveUser);
app.get('/users', db, routes.users.getAllUsers);
app.get('/export', db, routes.excel.export);

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