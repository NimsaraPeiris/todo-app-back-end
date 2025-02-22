import { Router, Request, Response, NextFunction } from "express";
import { todoService } from "../services/todo.service";
import { ITodo } from "../interfaces/todo.interface";

const router = Router();

// Get all todos
router.get("/getAllTodo", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await todoService.getAllTodos();
    const uncompletedTodos = todos.filter(todo => !todo.completed); // Only return tasks with completed = false

    res.json({
      success: true,
      data: uncompletedTodos,
    });
  } catch (error) {
    next(error);
  }
});


// Get todo by ID
router.get(
  "/getTodo/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid ID format",
        });
      }

      const todo = await todoService.getTodoById(id);
      if (!todo) {
        return res.status(404).json({
          success: false,
          error: "Todo not found",
        });
      }

      res.json({
        success: true,
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Create todo
router.post(
  "/createTodo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoData: ITodo = {
        task: req.body.task,
        description: req.body.description,
        completed: false,
      };

      const todo = await todoService.createTodo(todoData);
      res.status(201).json({
        success: true,
        data: todo,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          details: error.message,
        });
      }
      next(error);
    }
  }
);

// Update todo
router.put(
  "/updateTodo/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid ID format",
        });
      }

      const todoData: Partial<ITodo> = {
        task: req.body.task,
        description: req.body.description,
        completed: req.body.completed,
      };

      const todo = await todoService.updateTodo(id, todoData);
      if (!todo) {
        return res.status(404).json({
          success: false,
          error: "Todo not found",
        });
      }

      res.json({
        success: true,
        data: todo,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          details: error.message,
        });
      }
      next(error);
    }
  }
);

// Toggle todo completion
router.patch(
  "/toggleTodo/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid ID format",
        });
      }

      const todo = await todoService.toggleComplete(id);
      if (!todo) {
        return res.status(404).json({
          success: false,
          error: "Todo not found",
        });
      }

      res.json({
        success: true,
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
