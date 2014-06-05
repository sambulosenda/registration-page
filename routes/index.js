var moment = require('moment');

exports.index = function(req, res) {
	res.render('index.ejs', {month: moment().format('MMMM')});
};

exports.users = require('./users');
exports.excel = require('./excel');