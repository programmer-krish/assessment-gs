import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from "@mui/material";
import { TodoTableProps } from "../types/todo.interface";
import {
  Close as CloseIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const TodoTable: React.FC<TodoTableProps> = ({
  todos,
  onRowClick,
  onDeleteClick,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Done</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>
                <Checkbox
                  checked={todo.done}
                  icon={<CloseIcon sx={{ color: "red" }} />}
                  checkedIcon={<CheckIcon sx={{ color: "green" }} />}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onRowClick(todo)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onDeleteClick(todo)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoTable;
