exports.saveUser = function(req, res, db) {
	console.log('req: ' + req.db);
	console.log('db: ' + db);
	req.db.users.save({
		name: req.body.name,
		company: req.body.company,
		addreqs: req.body.address,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		attendance: req.body.attendance,
		comment: req.body.comment
	});
	console.log('saved');
};