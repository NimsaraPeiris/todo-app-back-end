import { todoService } from "../services/todo.service";
import Todo from "../models/todo.model";

// Mock the Todo model
jest.mock("../models/todo.model");

describe("Todo Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all todos", async () => {
    const todos = [{ id: 1, task: "Test task", completed: false }];
    (Todo.findAll as jest.Mock).mockResolvedValue(todos);

    const result = await todoService.getAllTodos();
    expect(result).toEqual(todos);
    expect(Todo.findAll).toHaveBeenCalledTimes(1);
  });

  it("should fetch a todo by ID", async () => {
    const todo = { id: 1, task: "Test task", completed: false };
    (Todo.findByPk as jest.Mock).mockResolvedValue(todo);

    const result = await todoService.getTodoById(1);
    expect(result).toEqual(todo);
    expect(Todo.findByPk).toHaveBeenCalledWith(1);
  });

  it("should create a new todo", async () => {
    const todoData = { task: "New task", description: "New description", completed: false };
    const createdTodo = { id: 1, ...todoData };
    (Todo.create as jest.Mock).mockResolvedValue(createdTodo);

    const result = await todoService.createTodo(todoData);
    expect(result).toEqual(createdTodo);
    expect(Todo.create).toHaveBeenCalledWith(todoData);
  });

  it("should update a todo", async () => {
    const todo = { id: 1, task: "Test task", completed: false, update: jest.fn() };
    (Todo.findByPk as jest.Mock).mockResolvedValue(todo);

    const todoData = { task: "Updated task", completed: true };
    const updatedTodo = { ...todo, ...todoData };
    (todo.update as jest.Mock).mockResolvedValue(updatedTodo);

    const result = await todoService.updateTodo(1, todoData);
    expect(result).toEqual(updatedTodo);
    expect(todo.update).toHaveBeenCalledWith(todoData);
  });

  it("should toggle a todo's completion", async () => {
    const todo = { id: 1, task: "Test task", completed: false, update: jest.fn() };
    (Todo.findByPk as jest.Mock).mockResolvedValue(todo);

    const updatedTodo = { ...todo, completed: true };
    (todo.update as jest.Mock).mockResolvedValue(updatedTodo);

    const result = await todoService.toggleComplete(1);
    expect(result).toEqual(updatedTodo);
    expect(todo.update).toHaveBeenCalledWith({ completed: true });
  });
});