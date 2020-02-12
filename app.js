const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const database = require('./database');
const app = express();


/**
 * MongoDb connection
 */
database.connect();


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