import React from "react";
import { TodoProvider } from "./context/TodoContext";
import AppContent from "./components/AppContent";
const App: React.FC = () => {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
};

export default App;
