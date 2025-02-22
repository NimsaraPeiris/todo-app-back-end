import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import todoRouter from "../routes/todo.route";
import { todoService } from "../services/todo.service";

jest.mock("../services/todo.service");

const app = express();
app.use(bodyParser.json());
app.use("/todos", todoRouter);

describe("Todo Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all uncompleted todos", async () => {
    const todos = [{ id: 1, task: "Test task", completed: false }];
    (todoService.getAllTodos as jest.Mock).mockResolvedValue(todos);

    const response = await request(app).get("/todos/getAllTodo");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: todos,
    });
  });

  it("should get a todo by ID", async () => {
    const todo = { id: 1, task: "Test task", completed: false };
    (todoService.getTodoById as jest.Mock).mockResolvedValue(todo);

    const response = await request(app).get("/todos/getTodo/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: todo,
    });
  });

  it("should create a new todo", async () => {
    const todoData = { task: "New task", description: "New description", completed: false };
    const createdTodo = { id: 1, ...todoData };
    (todoService.createTodo as jest.Mock).mockResolvedValue(createdTodo);

    const response = await request(app)
      .post("/todos/createTodo")
      .send(todoData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: createdTodo,
    });
  });

  it("should update a todo", async () => {
    const todoData = { task: "Updated task", description: "Updated description", completed: true };
    const updatedTodo = { id: 1, ...todoData };
    (todoService.updateTodo as jest.Mock).mockResolvedValue(updatedTodo);

    const response = await request(app)
      .put("/todos/updateTodo/1")
      .send(todoData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: updatedTodo,
    });
  });

  it("should toggle a todo's completion", async () => {
    const todo = { id: 1, task: "Test task", completed: false };
    const toggledTodo = { ...todo, completed: true };
    (todoService.toggleComplete as jest.Mock).mockResolvedValue(toggledTodo);

    const response = await request(app)
      .patch("/todos/toggleTodo/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: toggledTodo,
    });
  });
});