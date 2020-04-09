const TodoModel = require('../model/todo.model');


/**
 * Creates a new todo item in DB
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
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
			res.status(500).json({error: 'Some parameters are missing'})
		}
	} catch (e) {
		res.status(500).json({error: e.message})
	}
};

/**
 * Finds and returns all todo items from DB
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getTodos = async (req, res) => {
	try {
		const docs = await TodoModel.find({});
		res.status(200).json(docs);
	} catch (e) {
		res.status(500).json({error: e.message})
	}
};

/**
 * Find a single todo from DB using todoId
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getTodoById = async (req, res) => {
	try {
		const todoId = req.params.todoId;
		if (todoId !== undefined && todoId !== "") {
			const doc = await TodoModel.findById(todoId);
			if(doc) {
				res.status(200).json(doc);
			} else {
				res.status(500).json({error: 'Todo item not found'})
			}
		} else {
			res.status(500).json({error: 'Todo Id is missing'})
		}
	} catch (e) {
		res.status(500).json({error: e.message})
	}
}
