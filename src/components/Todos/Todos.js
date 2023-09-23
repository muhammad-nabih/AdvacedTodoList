import React from "react";
import "./Todos.css";
import Todo from "../Todo/Todo";
import { TodosContext } from "../context/TodosContext";

const Todos = () => {
  const { todos } = React.useContext(TodosContext);

  const todoJsx = todos.map((t, index) => {
    return <Todo key={index} todo={t} />;
  });

  return <div className="todoList">{todoJsx}</div>;
};

export default Todos;
