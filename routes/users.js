var moment = require('moment');

exports.saveUser = function(req, res, db) {
	new req.db.User({
		name: req.body.name,
		company: req.body.company,
		address: req.body.address,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		attendance: req.body.attendance,
		comment: req.body.comment,
		date: moment().format('DD-MMMM-YYYY')
	}).save();
	res.render('results.ejs', 
		{name: req.body.name, 
		month: moment().format('MMMM')}
	);
};

exports.getAllUsers = function(req, res, db) {
	req.db.User.find({}, function(err, users) {
		res.render('users-list.ejs', {users: users});
	});
};
