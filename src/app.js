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

mongoose.connection.on('error', function(err){
	console.log('database connect error: ' + err);
});

Greeting.find( function(err, greetings){
	var greeting = new Greeting({ sentence: helloGreeting });
	greeting.save(function (err, greetingsav) {
		if (err){
			console('couldnt save a greeting to the Db');
		} else {
			console.log('new greeting '+greeting.sentence+' was succesfully saved to Db' );

			Greeting.find( function(err, greetings){
				if( greetings )
					console.log('checked after save: found '+greetings.length+' greetings in DB' );
          }); // Greeting.find()
        } // else
      }); // greeting.save()
  }); // Greeting.find()

app.get('/', function(req, res) {
	Greeting.find(function (err, greetings) {
		if (err) {
			console.log('couldnt find a greeting in DB. error '+err);
			next(err);
		} else {
			if(greetings){
				console.log('found '+greetings.length+' greetings in DB');
				responseText = greetings[0].sentence;
			}
			console.log('sending greeting to client: '+responseText);
			res.send(responseText);
		}
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