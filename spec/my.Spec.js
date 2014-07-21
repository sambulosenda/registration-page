describe('routes', function() {

var request = require('request');

	it ('should respond when you perform a GET on the / route', function(done) {
		request('http://localhost:8080/', function(error, response, body) {
			expect(response.statusCode).toBe(200);
			done();
		});
	});	

	it ('should respond to when you perform a GET on the /users route', function(done) {
		request('http://localhost:8080/users', function(error, response, body) {
			expect(response.statusCode).toBe(200);
			done();
		});
	});

	it ('should respond to when you perform a POST on the /users route', function(done) {
		request.post('http://localhost:8080/users', function(error, response, body) {
			expect(response.statusCode).toBe(200);
			done();
		});
	});

	it ('should respond to when you perform GET on the /export route', function(done) {
		request('http://localhost:8080/export', function(error, response, body) {
			expect(response.statusCode).toBe(200);
			done();
		});
	});
});