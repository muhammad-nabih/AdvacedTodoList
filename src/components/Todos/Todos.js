import React from "react";

import Todo from "../Todo/Todo";
import { useTodos } from "../context/TodosContext";

const Todos = () => {
  const { todos } = useTodos();
  const todoJsx = todos.map((t, index) => {
    return <Todo key={index} todo={t} />;
  });

  return <div className="todoList">{todoJsx}</div>;
};

export default Todos;
