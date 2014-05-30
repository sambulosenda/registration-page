exports.index = function(req, res) {
	res.render('index');
};

exports.users = require('./users');
exports.excel = require('./excel');