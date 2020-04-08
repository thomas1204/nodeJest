const TodoModel = require('../model/todo.model');

exports.createTodo = async (req, res) => {
	try {
		if (
			req.body.title !== undefined &&
			req.body.title !== "" &&
			req.body.done !== undefined &&
			req.body.done !== ""
		) {
			const doc = await TodoModel.create(req.body);
			res.status(200).json(doc);
		} else {
			res.status(500).send({error: 'Some parameters are missing'})
		}
	} catch (e) {
		res.status(500).send({error: e})
	}
};

exports.getTodos = async (req, res) => {
	try {
		const docs = await TodoModel.find({});
		res.status(200).json(docs);
	} catch (e) {
		res.status(500).send({error: e})
	}
};
