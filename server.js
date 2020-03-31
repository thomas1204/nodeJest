const app = require('./app');
const port = 3000;
/**
 * Listening to port
 */
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});