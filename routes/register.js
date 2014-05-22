exports.register = function(req, res, db) {
	req.db.users.save({
		name: req.body.name,
		company: req.body.company,
		addreqs: req.body.address,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		attendance: req.body.attendance,
		comment: req.body.comment
	});
};