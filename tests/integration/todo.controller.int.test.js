const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/newTodo');
const endPointUrl = "/todos/";


describe(endPointUrl, () => {
	
	it(`POST ${endPointUrl}`, (done) => {
		request(app)
			.post(endPointUrl)
			.send(newTodo)
			.end((err, data) => {
				if (err) {
					callback( null);
				} else {
					callback(data);
				}
			});
		
		function callback(response) {
			expect(response.statusCode).toBe(200);
			expect(response.data.title).toBe(newTodo.title);
			expect(response.data.done).toBe(newTodo.done);
			done();
		}
	});
	
});