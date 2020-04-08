const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/newTodo');


const endPointUrl = "/todos/"; // APP URL

describe(endPointUrl, () => {
	
	
	it(`should return 200 with proper post data`, async () => {
		const response = await request(app)
			.post(endPointUrl)
			.send(newTodo);
		expect(response.statusCode).toBe(200);
		expect(response.body._id).not.toBeNull();
		expect(response.body.title).toBe(newTodo.title);
		expect(response.body.done).toBe(newTodo.done);
	});
	
	
	it("should return 500 on malformed post data", async () => {
		
		const response = await request(app)
			.post(endPointUrl)
			.send({title: newTodo.title});
		expect(response.statusCode).toBe(500);
		expect(response.body).toStrictEqual({"error": "Some parameters are missing"});
	});
	
});