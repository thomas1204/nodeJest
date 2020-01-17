const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/newTodo');
const endPointUrl = "/todos/";


describe(endPointUrl, () => {
	
	it(`POST ${endPointUrl}`, () => {
		request(app)
			.post(endPointUrl)
			.send(newTodo)
			.end((err, data) => {
				if (err) {
					done(err, null);
				} else {
					done(null, data);
				}
			});
		
		function done(err, response) {
			expect(response.statusCode).toBe(200);
			expect(response.data.title).toBe(newTodo.title);
			expect(response.data.done).toBe(newTodo.done);
		}
	});
	
});