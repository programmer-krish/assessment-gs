/**
 * Module  - TODO LIST
 * Author :  Krishnamohan Ramachandran
 */

import { Request, Response } from "express";
import { log } from "../logger";
import { ERRORS } from "../validation/error";
import { postSchema, reqParamasSchemaId } from "../schema/schema";
import { todoList } from "../data/data";

export const getAllTodoList = async (req: Request, res: Response) => {
  const { item } = req.query;
  try {
    if (item) {
      const filteredTasks = todoList.filter((task) =>
        task.title.toLowerCase().includes((item as string).toLowerCase())
      );
      return res.status(200).json({ message: "success", data: filteredTasks });
    }
    return res.status(200).json({ message: "success", data: todoList });
  } catch (e) {
    log.error(e);
    return res.status(500).json({
      status: "error",
      error: ERRORS.INTERNAL_SERVER_ERROR,
    });
  }
};

export const addTodoList = async (req: Request, res: Response) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      error: ERRORS.VALIDATION_ERROR,
    });
  }

  try {
    let currentId = todoList.length;
    const newTask = {
      id: ++currentId,
      title: req.body.title,
      done: req.body.done ?? true,
    };
    todoList.push(newTask);
    res.status(201).json(newTask);
  } catch (e) {
    log.error(e);
    return res.status(500).json({
      status: "error",
      error: ERRORS.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateTodoList = async (req: Request, res: Response) => {
  const { error } = reqParamasSchemaId.validate(req.params);
  if (error) {
    return res.status(400).json({
      status: "error",
      error: ERRORS.VALIDATION_ERROR,
    });
  }

  try {
    const { id } = req.params;
    const task = todoList.find((task) => task.id === parseInt(id));
    if (!task) {
      return res.status(404).json({
        status: "error",
        error: ERRORS.NOT_FOUND,
      });
    }

    task.done = !task.done;
    res.status(200).json(task);
  } catch (e) {
    log.error(e);
    return res.status(500).json({
      status: "error",
      error: ERRORS.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteTodoList = async (req: Request, res: Response) => {
  const { error } = reqParamasSchemaId.validate(req.params);
  if (error) {
    return res.status(400).json({
      status: "error",
      error: ERRORS.VALIDATION_ERROR,
    });
  }

  try {
    const { id } = req.params;
    const taskIndex = todoList.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
      return res.status(404).json({
        status: "error",
        error: ERRORS.NOT_FOUND,
      });
    }

    todoList.splice(taskIndex, 1);
    res.status(200).send({ message: "Deleted successfully" });
  } catch (e) {
    log.error(e);
    return res.status(500).json({
      status: "error",
      error: ERRORS.INTERNAL_SERVER_ERROR,
    });
  }
};
