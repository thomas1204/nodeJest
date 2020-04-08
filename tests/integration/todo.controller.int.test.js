const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/newTodo');


const endPointUrl = "/todos/"; // APP URL

describe(endPointUrl, () => {
	
	it(`should return 200 given proper post data, ${endPointUrl}`, async () => {
		const response = await request(app)
			.post(endPointUrl)
			.send(newTodo);
		expect(response.statusCode).toBe(200);
		expect(response.body._id).not.toBeNull();
		expect(response.body.title).toBe(newTodo.title);
		expect(response.body.done).toBe(newTodo.done);
	});
	
	it(`should return 500 on malformed post data, ${endPointUrl}`, async () => {
		const response = await request(app)
			.post(endPointUrl)
			.send({title: newTodo.title});
		expect(response.statusCode).toBe(500);
		expect(response.body).toStrictEqual({"error": "Some parameters are missing"});
	});
	
	it(`should return all the todo items, ${endPointUrl}`, async () => {
		const response = await request(app).get(endPointUrl);
		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body[0]._id).toBeDefined();
		expect(response.body[0].title).toBeDefined();
		expect(response.body[0].done).toBeDefined();
	});
	
	
});