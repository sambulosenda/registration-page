var fs = require('fs');
var xlsx = require('node-xlsx');

exports.export = function (req, res, db) {

	var fileData = {worksheets: [
		{
			'name':'mySheetName', 
			'data':[
	    		['Name', 'Company', 'Address', 'Phone Number', 'Email', 'Attendance', 'Comment', 'Registered Date']
			]
		}
	]}

	var users = req.db.User.find({}, function(err, users) {
		users.forEach(function(user, index) {
			fileData.worksheets[0].data.push(formatRow(user));
		});
		fs.writeFileSync('event.xlsx', xlsx.build(fileData), function(err){if (err) throw err;});
		res.download('./event.xlsx', 'event.xlsx', function(err) {
			if(err) throw err;
			fs.unlink('.event.xlsx');
		});
	});

};

function formatRow(user) {
	var fields = ['name', 'company', 'address', 'phoneNumber', 'email', 'attendance', 'comment', 'date'];
	var row = [];

	for (var i = 0; i < fields.length; i++) {
		var format = 'General'; 

		if (fields[i] == 'date')
			format = 'YYYY/MM/DD'

	    row.push({value: user[fields[i]], formatCode: format});
	}

	return row;
}