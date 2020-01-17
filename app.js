const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();

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
app.listen(3000, () => {
	console.log('Server running');
});


module.exports = app;