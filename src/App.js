import React from "react";
import "./App.css";
import AddTask from "./components/AddTask/AddTask";
import { TodosContextProvider } from "./components/context/TodosContext";

function App() {
  return (
    <TodosContextProvider>
      <div className="App">
        <AddTask />
      </div>
    </TodosContextProvider>
  );
}

export default App;
