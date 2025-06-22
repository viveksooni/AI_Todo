import { Router } from "express";
import {
  createTodo,
  deleteTodos,
  getTodos,
  markComplete,
} from "../controllers/Todos.controller.js";

export const TodoRouter = Router();

TodoRouter.post("/createTodo", createTodo);

TodoRouter.get("/:userId", getTodos);

TodoRouter.delete("/:todoId", deleteTodos);

TodoRouter.put("/markComplete", markComplete);
