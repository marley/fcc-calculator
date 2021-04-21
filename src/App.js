import React from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import Display from "./components/Display";

function App() {
  return (
    <div className="App">
      <Display />
      <Calculator />
    </div>
  );
}

export default App;
