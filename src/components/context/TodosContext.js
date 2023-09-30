import React, { createContext, useContext, useState } from "react";

const TodosContext = createContext();

export const useTodos = () => {
  return useContext(TodosContext);
};

export const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
