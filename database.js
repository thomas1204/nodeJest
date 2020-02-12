const mongoose = require('mongoose');


function connect() {
	const dbUrl = 'mongodb+srv://shayamthomas:letmein123@loree-76xnb.mongodb.net/todo?retryWrites=true&w=majority';
	mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
		if (err) {
			console.log("MongoDB connection error", err);
		} else {
			console.log('MongoDb connected successfully');
		}
	});
}


module.exports = {
	connect
};

