import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { Todo, TodoContextType } from "../types/todo.interface";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8000/api/todos"
        }`
      );
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, { ...todo, id: todos.length + 1 }]);
  };

  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        fetchTodos,
        addTodo,
        updateTodo,
        setTodos,
        searchTerm,
        setSearchTerm,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
