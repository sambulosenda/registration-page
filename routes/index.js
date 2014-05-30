exports.index = function(req, res) {
	res.render('index');
};

exports.users = require('./users');