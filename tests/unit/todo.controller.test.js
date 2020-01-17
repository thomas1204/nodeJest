const TodoController = require('../../controllers/todo.controller');
const TotoModel = require('../../model/todo.model');

TotoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
	
	it("should have a create todo function", () => {
		expect(typeof TodoController.createTodo).toBe("function");
	});
	
	it('should call TodoModel.create', () => {
		TodoController.createTodo();
		expect(TotoModel.create).toBeCalled();
	});
	
});