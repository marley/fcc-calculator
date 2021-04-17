import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import "./App.css";
import { Display } from "./components/Display";

function App() {
  return (
    <div className="App">
      <Display />
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}

export default App;
