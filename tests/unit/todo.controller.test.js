const TodoController = require('../../controllers/todo.controller');
const TotoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http'); // mock http library
const newTodo = require('../mock/newTodo');
const allTodos = require('../mock/allTodos');
const todo = require('../mock/todo.json');

TotoModel.create = jest.fn();
TotoModel.find = jest.fn();
TotoModel.findById = jest.fn();

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
	
	it('should call TodoModel.create', async () => {
		await TodoController.createTodo(req, res);
		expect(TotoModel.create).toBeCalled();
	});
	
	it("should return 200 response code", async () => {
		await TodoController.createTodo(req, res);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
	});
	
	it("should return json body in response", async () => {
		TotoModel.create.mockReturnValue(newTodo);
		await TodoController.createTodo(req, res);
		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toStrictEqual(newTodo);
	});
	
	it("Should return with statusCode 500 when parameters are missing", async () => {
		delete req.body.title;
		await TodoController.createTodo(req, res);
		expect(res.statusCode).toBe(500);
	})
	
});


describe('TodoController.getTodos', () => {
	
	it("should have a getTodos function", () => {
		expect(typeof TodoController.getTodos).toBe("function");
	});
	
	it('should call TodoModel.find', () => {
		TodoController.getTodos(req, res);
		expect(TotoModel.find).toBeCalled();
	});
	
	it("should return 200 response code", async () => {
		await TodoController.getTodos(req, res);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
	});
	
	it("should return json body in response", async () => {
		TotoModel.find.mockReturnValue(allTodos);
		await TodoController.getTodos(req, res);
		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toStrictEqual(allTodos);
	});
	
	it("Should handle error", async () => {
		const errorMessage = {message: "Error finding docs"};
		const rejectedPromise = Promise.reject(errorMessage);
		TotoModel.find.mockReturnValue(rejectedPromise);
		await TodoController.getTodos(req, res);
		expect(res.statusCode).toBe(500);
		expect(res._getJSONData()).toStrictEqual({error: 'Error finding docs'});
	})
	
});


describe('TodoController.getTodoById', () => {
	
	const todoId = "5e43a53ff19a2d14469b73d6";
	
	beforeEach(() => {
		req.params.todoId = todoId;
	});
	
	it("should have a getTodoById function", () => {
		expect(typeof TodoController.getTodoById).toBe("function");
	});
	
	it('should call TodoModel.findById', async () => {
		await TodoController.getTodoById(req, res);
		expect(TotoModel.findById).toBeCalledWith(todoId);
	});
	
	it("should return json body in response", async () => {
		TotoModel.findById.mockReturnValue(todo);
		await TodoController.getTodoById(req, res);
		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toStrictEqual(todo);
		expect(res._isEndCalled()).toBeTruthy();
	});
	
	it("Should handle error when todoId is attached", async () => {
		req.params.todoId = "";
		await TodoController.getTodoById(req, res);
		expect(res.statusCode).toBe(500);
		expect(res._getJSONData()).toStrictEqual({error: 'Todo Id is missing'});
		expect(res._isEndCalled()).toBeTruthy();
	})
	
	it("Should handle error when todo is not found", async () => {
		TotoModel.findById.mockReturnValue(null);
		await TodoController.getTodoById(req, res);
		expect(res.statusCode).toBe(500);
		expect(res._getJSONData()).toStrictEqual({error: "Todo item not found"});
		expect(res._isEndCalled()).toBeTruthy();
	})
	
	it("Should handle error", async () => {
		const message = "Error finding doc";
		const errorMessage = {message: message};
		const rejectedPromise = Promise.reject(errorMessage);
		TotoModel.findById.mockReturnValue(rejectedPromise);
		await TodoController.getTodoById(req, res);
		expect(res.statusCode).toBe(500);
		expect(res._getJSONData()).toStrictEqual({error: message});
	})
	
})


