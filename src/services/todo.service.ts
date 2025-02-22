import Todo from "../models/todo.model";
import { ITodo } from "../interfaces/todo.interface";

export const todoService = {
  getAllTodos: async () => {
    return await Todo.findAll();
  },

  getTodoById: async (id: number) => {
    return await Todo.findByPk(id);
  },

  createTodo: async (todoData: ITodo) => {
    return await Todo.create(todoData);
  },

  updateTodo: async (id: number, todoData: Partial<ITodo>) => {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;
    return await todo.update(todoData);
  },

  toggleComplete: async (id: number) => {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;
    return await todo.update({ completed: true }); 
  },
  
};