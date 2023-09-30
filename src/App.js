import { useState } from "react";
import "./App.css";
// Main Components ;
import "./components/AddTask/AddTask";
import AddTask from "./components/AddTask/AddTask";
import { TodosContext } from "./components/context/TodosContext";

// MATERIAL UI COMPONENTS

// const InitialTodos = [
//   {
//     id: 1,
//     title: "task 1 ",
//     details: "this is task 1 ",
//     completed: false,
//     priority: "Low",
//     date: format(new Date(), "yyyy-MM-dd "),
//   },
//   {
//     id: 2,
//     title: "task 2 ",
//     details: "this is task 2 ",
//     completed: false,
//     priority: "High",
//     date: format(new Date(), "yyyy-MM-dd"),
//   },
//   {
//     id: 3,
//     title: "task 3 ",
//     details: "this is task 2 ",
//     completed: false,
//     priority: "Medium",
//     date: format(new Date(), "yyyy-MM-dd"),
//   },
// ];

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <div className="App">
        <AddTask />
      </div>
    </TodosContext.Provider>
  );
}

export default App;
