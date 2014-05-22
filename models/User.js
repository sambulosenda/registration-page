var mongoose = require('mongoose');
var Schema = mongoose.Schema;
exports.User = mongoose.Schema({
	name: String,
	company: String,
	address: String,
	phoneNumber: String,
	email: String,
	attendance: String,
	comment: String
}); 