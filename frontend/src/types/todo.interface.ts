export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export interface TodoDialogProps {
  todo: Todo | null;
  onSave: (todo: Todo) => void;
}

export interface TodoTableProps {
  todos: Todo[];
  onRowClick: (todo: Todo) => void;
  onDeleteClick: (todo: Todo) => void;
}

export interface TodoContextType {
  todos: Todo[];
  fetchTodos: () => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setTodos: (todos: Todo[]) => void;
}
