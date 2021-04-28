const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
};

exports.getTodos = async (req, res, next) => {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
};