const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

TodoModel.create = jest.fn();

let req, res, next;

// this function runs before each test
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe("TodoController.createDoto", () => {

    beforeEach(() => {
        req.body = newTodo;
    });

    // Test 1 : do we have a createTodo function ?
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });

    // Test 2 : in our controller, is the method TodoModel.create called ? 
    it("should call Todo.create", () => {
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });

    // Test 3 
    it("should return 201 response code", () => {
        TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    // Test 4
    it("should return json body in the response", () => {
        TodoModel.create.mockReturnValue(newTodo);
        TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })
});