const mongoose = require('mongoose');


async function connect() {
	try {
		const dbUrl = 'mongodb+srv://shayamthomas:letmein123@loree-76xnb.mongodb.net/todo?retryWrites=true&w=majority';
		await mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
		console.log("DB connected successfully");
	} catch (e) {
		throw e;
	}
}


module.exports = {
	connect
};

