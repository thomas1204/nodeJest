const TodoModel = require('../model/todo.model');

exports.createTodo = (req, res) => {
	if (
		req.body.title !== undefined &&
		req.body.title !== "" &&
		req.body.done !== undefined &&
		req.body.done !== ""
	) {
		TodoModel.create(req.body, (err, doc) => {
			res.status(200).json(doc);
		});
	} else {
		res.status(500).end();
	}
};
