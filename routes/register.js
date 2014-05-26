exports.saveUser = function(req, res, db) {
	new req.db.User({
		name: req.body.name,
		company: req.body.company,
		addreqs: req.body.address,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		attendance: req.body.attendance,
		comment: req.body.comment
	}).save();
	res.render('results', {name: req.body.name});
};