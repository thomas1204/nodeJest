const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/newTodo');
const endPointUrl = "/todos/";


describe(endPointUrl, () => {
	
	it(`POST ${endPointUrl}`, (done) => {
		request(app).post(endPointUrl).send(newTodo).then((response) => {
			expect(response.statusCode).toBe(200);
			expect(response.body.title).toBe(newTodo.title);
			expect(response.body.done).toBe(newTodo.done);
			done();
		}).catch((e)=>{
			done(e);
		})
	});
	
});