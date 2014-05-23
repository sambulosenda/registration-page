exports.index = function(req, res) {
	res.render('index.html');
};

exports.register = require('./register');