const TodoController = require('../../controllers/todo.controller');
const TotoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock/newTodo');


TotoModel.create = jest.fn();


let req, res, next;
beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	next = null;
});


describe("TodoController.createTodo", () => {
	
	beforeEach(() => {
		req.body = newTodo;
	});
	
	it("should have a create todo function", () => {
		expect(typeof TodoController.createTodo).toBe("function");
	});
	
	it('should call TodoModel.create', () => {
		TodoController.createTodo(req, res);
		expect(TotoModel.create).toBeCalled();
	});
	
	it("should return 200 response code", () => {
		TodoController.createTodo(req, res, () => {
			expect(res.statusCode).toBe(200);
			expect(res._isEndCalled()).toBeTruthy();
		});
	});
	
	it("should return json body in response", () => {
		TotoModel.create.mockReturnValue(newTodo);
		TodoController.createTodo(req, res, () => {
			expect(res.statusCode).toBe(200);
			expect(res._getJSONData()).toStrictEqual(newTodo);
		});
	});
	
	it("Should handle if input value for `title` is missing", () => {
		delete req.body.title;
		const errorMessage = {message : "Title parameter is missing "};
		const rejectedPromise = Promise.reject(errorMessage);
		TotoModel.create.mockReturnValue(rejectedPromise);
		TodoController.createTodo(req, res, () => {
			expect(res.statusCode).toBe(400);
			expect(res._getJSONData()).toStrictEqual(errorMessage);
		});
	})
	
});