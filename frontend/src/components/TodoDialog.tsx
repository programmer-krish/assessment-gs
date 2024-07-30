import React, { useState, useEffect } from "react";
import { TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useTodos } from "../context/TodoContext";
import { TodoDialogClose } from "../types/todo.interface";

const TodoDialog: React.FC<TodoDialogClose> = ({ todo, handleClose }) => {
  const { addTodo, updateTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDone(todo.done);
    }
  }, [todo]);

  const handleSaveClick = () => {
    const newTodo = { id: todo ? todo.id : Date.now(), title, done };
    if (todo) {
      updateTodo(newTodo);
    } else {
      addTodo(newTodo);
    }
    handleClose();
  };

  return (
    <div>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
        }
        label="Done"
      />
      <Button variant="contained" color="primary" onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
};

export default TodoDialog;
