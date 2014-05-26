exports.index = function(req, res) {
	res.render('index');
};

exports.register = require('./register');