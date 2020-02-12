const TodoModel = require('../model/todo.model');

exports.createTodo = (req, res) => {
	TodoModel.create(req.body, (err, doc) => {
		console.log('err', err);
		res.status(200).send(doc);
	});
};
