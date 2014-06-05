exports.index = function(req, res) {
	res.render('index.ejs');
};

exports.users = require('./users');
exports.excel = require('./excel');