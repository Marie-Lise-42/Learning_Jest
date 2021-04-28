const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

TodoModel.create = jest.fn();
// mock implementation of find
TodoModel.find = jest.fn(); 

let req, res, next;

// this function runs before each test
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe("TodoController.getTodos", () => {
    // Test 1 : do we have a getTodos function ?
    it("should have a getTodoes function", () => {
        expect(typeof TodoController.getTodos).toBe("function");
    });

    // Test 2 
    it("should call TodoModel.find({})", async () => {
        // we need to be sure that it is a mock function
        // we can only spy on it if we have the jest.fn() 
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });
    it("should return response with status 200 and all todo", async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    })
});

describe("TodoController.createTodo", () => {

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
    it("should return 201 response code", async () => {
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    // Test 4
    it("should return json body in the response", async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })
});