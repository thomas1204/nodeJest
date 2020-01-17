const TodoController = require('../../controllers/todo.controller');
const TotoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');

TotoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
	
	it("should have a create todo function", () => {
		expect(typeof TodoController.createTodo).toBe("function");
	});
	
	it('should call TodoModel.create', () => {
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();
		const next = null;
		TodoController.createTodo(req, res, next);
		expect(TotoModel.create).toBeCalled();
	});
	
});