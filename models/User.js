var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
	name: String,
	company: String,
	address: String,
	phoneNumber: String,
	email: String,
	attendance: String,
	comment: String,
	date: Date
});