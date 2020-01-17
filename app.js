const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const mongoose = require('mongoose');
const app = express();


/**
 * MongoDb connection
 */
const dbUrl = 'mongodb+srv://shayamthomas:bleedblood@loree-76xnb.mongodb.net/todo?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
	if (err) {
		console.log("MongoDB connection error", err);
	} else {
		console.log('MongoDb connected successfully');
	}
});

/**
 * Express configuration
 */
app.use(express.json());


/**
 * Routes
 */
app.use('/todos', todoRoutes);
app.get('/', (req, res) => {
	res.json('hello world');
});


/**
 * Listening to port
 */
// app.listen(3000, () => {
// 	console.log('Server running');
// });


module.exports = app;