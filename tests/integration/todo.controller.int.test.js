const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/newTodo');


const endPointUrl = "/todos/"; // APP URL

describe(endPointUrl, () => {
	
	
	it(`should return 200 with proper data`, (done) => {
		request(app)
			.post(endPointUrl)
			.send(newTodo)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body._id).not.toBeNull();
				expect(response.body.title).toBe(newTodo.title);
				expect(response.body.done).toBe(newTodo.done);
				done();
			})
			.catch((e) => {
				done(e);
			})
	});
	
	
	it("should return 500 on malformed data", (done) => {
		const malformedData = {
			title: newTodo.title
		};
		request(app)
			.post(endPointUrl)
			.send(malformedData)
			.then((response) => {
				expect(response.statusCode).toBe(500);
				done();
			})
			.catch((e) => {
				done(e);
			})
	});
	
});