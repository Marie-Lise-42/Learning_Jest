// Supertest tests a whole app.js 
const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

describe(endpointUrl, () => {
    it("POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe(newTodo.title);
            expect(response.body.done).toBe(newTodo.done);
    });
    it("sould return error 500 on malformed data with POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({ title: "missing done property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            message: "Todo validation failed: done: Path `done` is required."
        });
    })
});