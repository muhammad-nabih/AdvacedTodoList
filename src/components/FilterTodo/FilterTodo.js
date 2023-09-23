import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Divider } from "@mui/material";
import { useContext, useState, useMemo } from "react";
import { TodosContext } from "../context/TodosContext";
export default function ToggleBtnGroup() {
  const [alignment, setAlignment] = useState("all");

  const { todos, setTodos } = useContext(TodosContext);

  let typeTodos = todos;

  // const FilterCompletedTodo = useMemo(() => {
  //   const completedTodos = todos.filter((t) => {
  //     return t.isCompleted;
  //   });
  //   return completedTodos;
  // }, [todos]);

  // const FilterUnCompletedTodo = useMemo(() => {
  //   const uncompletedTodos = todos.filter((t) => {
  //     return !t.isCompleted;
  //   });
  //   return uncompletedTodos;
  // }, [todos]);

  // if (alignment === "uncompleted") {
  //   typeTodos = FilterUnCompletedTodo;
  //   setTodos(typeTodos);
  // } else if (alignment === "completed") {
  //   typeTodos = FilterCompletedTodo;
  //   setTodos(typeTodos);
  // }

  function handleChange(_e) {
    setAlignment(_e.target.value);
  }
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px auto ",
        }}
      >
        <ToggleButton value="all">all</ToggleButton>
        <ToggleButton value="completed">completed</ToggleButton>
        <ToggleButton value="uncompleted">uncompleted</ToggleButton>
      </ToggleButtonGroup>
      <Divider />
    </>
  );
}
