import { Router } from "express";
import {
  getAllTodos,
  getSpecificTodo,
  postTodo,
  removeSpecificTodo,
  removeAllTodos
} from "../controllers/todo";

const todoRouter = new Router();

todoRouter.get("/", getAllTodos);
todoRouter.get("/:id", getSpecificTodo);
todoRouter.post("/", postTodo);
todoRouter.put("/remove/:id", removeSpecificTodo);
todoRouter.put("/remove", removeAllTodos);

export default todoRouter;
