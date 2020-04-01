const TodoController = require('../../controllers/todo.controller');
const TotoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http'); // mock http library
const newTodo = require('../mock/newTodo');

TotoModel.create = jest.fn();
TotoModel.find = jest.fn();

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
	
	it("should have a createTodo function", () => {
		expect(typeof TodoController.createTodo).toBe("function");
	});
	
	it('should call TodoModel.create', () => {
		TodoController.createTodo(req, res);
		expect(TotoModel.create).toBeCalled();
	});
	
	it("should return 200 response code", () => {
		TodoController.createTodo(req, res);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
	});
	
	it("should return json body in response", () => {
		TotoModel.create.mockReturnValue(newTodo);
		TodoController.createTodo(req, res, () => {
			expect(res.statusCode).toBe(200);
			expect(res._getJSONData()).toStrictEqual(newTodo);
		});
	});
	
	it("Should return with statusCode 500 when parameters are missing", () => {
		delete req.body.title;
		TodoController.createTodo(req, res, () => {
			expect(res.statusCode).toBe(500);
		});
	})
	
});


describe('TodoController.getTodos', () => {
	
	it("should have a getTodos function", () => {
		expect(typeof TodoController.getTodos).toBe("function");
	});
	
	it('should call TodoModel.find', () => {
		TodoController.getTodos(req, res, () => {
			expect(TotoModel.find).toBeCalled();
		});
	});
	
	it("should return 200 response code", () => {
		TodoController.getTodos(req, res, () => {
			expect(res.statusCode).toBe(200);
			expect(res._isEndCalled()).toBeTruthy();
		});
	});
	
});