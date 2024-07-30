import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
} from "@mui/material";
import { useTodos } from "../context/TodoContext";
import TodoTable from "../components/TodoTable";
import TodoDialog from "../components/TodoDialog";
import { Todo } from "../types/todo.interface";

const AppContent: React.FC = () => {
  const { todos, searchTerm, setSearchTerm, setTodos } = useTodos();
  const [open, setOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const handleAddClick = () => {
    setCurrentTodo(null);
    setOpen(true);
  };

  const handleRowClick = (todo: Todo) => {
    setCurrentTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (todo: Todo) => {
    setTodoToDelete(todo);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (todoToDelete) {
      setTodos(todos.filter((t) => t.id !== todoToDelete.id));
      setDeleteDialogOpen(false);
      setTodoToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTodoToDelete(null);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4">Assignment GapStars</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginTop: "1rem" }}>
        Add Todo
      </Button>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      {filteredTodos.length > 0 ? (
        <TodoTable
          todos={filteredTodos}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
        />
      ) : (
        <Typography
          variant="h6"
          style={{ marginTop: "1rem", textAlign: "center", color: "red" }}>
          No data found !!!
        </Typography>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentTodo ? "Edit Todo" : "Add Todo"}</DialogTitle>
        <DialogContent>
          <TodoDialog todo={currentTodo} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this todo?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppContent;
