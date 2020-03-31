const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/newTodo');


const endPointUrl = "/todos/"; // APP URL

describe(endPointUrl, () => {
	
	
	it(`should return 200 with proper post data`, (done) => {
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
	
	
	it("should return 500 on malformed post data", (done) => {
		request(app)
			.post(endPointUrl)
			.send({title: newTodo.title})
			.then((response) => {
				expect(response.statusCode).toBe(500);
				expect(response.body).toStrictEqual({"error": "Some parameters are missing"});
				done();
			})
			.catch((e) => {
				done(e);
			})
	});
	
});