import React from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import Display from "./components/Display";

function App() {
  return (
    <div
      id="main"
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <div className="App">
        <Display />
        <Calculator />
      </div>
      <p>
        designed and coded by{" "}
        <a href="https://github.com/marley/fcc-calculator">marley</a>
      </p>
    </div>
  );
}

export default App;
