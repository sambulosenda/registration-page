describe('app', function() {

var request = require('request');

	it ('should respond to /', function(done) {
		request('http://localhost:8080/', function(error, response, body) {
			expect(response.statusCode).toBe(200);
			done();
		});
	})	
})