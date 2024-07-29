import { Router } from "express";

import {
  getAllTodoList,
  addTodoList,
  deleteTodoList,
  updateTodoList,
} from "../controllers/todo.controller";

const router = Router();

router.post("/", addTodoList);

router.get("/", getAllTodoList);

router.put("/:id", updateTodoList);

router.delete("/:id", deleteTodoList);

export default router;
