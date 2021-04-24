import React from "react";
import { connect } from "react-redux";
import {
  pressNum,
  pressOperator,
  pressEquals,
  pressClear,
} from "../redux/actions";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = (event) => {
    let val = event.target.value;
    if (/[0-9.]/.test(val)) {
      this.props.pressNum(val);
    } else if (/[+*/-]/.test(val)) {
      this.props.pressOperator(val);
    } else if (val === "=") {
      this.props.pressEquals();
    } else {
      this.props.pressClear();
    }
  };

  render() {
    let buttonData = [
      { name: "clear", value: "C", buttonType: "btn-warning" },
      { name: "divide", value: "/", buttonType: "btn-primary" },
      { name: "nine", value: 9, buttonType: "btn-info" },
      { name: "eight", value: 8, buttonType: "btn-info" },
      { name: "seven", value: 7, buttonType: "btn-info" },
      { name: "multiply", value: "*", buttonType: "btn-primary" },
      { name: "six", value: 6, buttonType: "btn-info" },
      { name: "five", value: 5, buttonType: "btn-info" },
      { name: "four", value: 4, buttonType: "btn-info" },
      { name: "subtract", value: "-", buttonType: "btn-primary" },
      { name: "three", value: 3, buttonType: "btn-info" },
      { name: "two", value: 2, buttonType: "btn-info" },
      { name: "one", value: 1, buttonType: "btn-info" },
      { name: "add", value: "+", buttonType: "btn-primary" },
      { name: "zero", value: 0, buttonType: "btn-info" },
      { name: "decimal", value: ".", buttonType: "btn-info" },
      { name: "equals", value: "=", buttonType: "btn-success" },
    ];
    let buttons = [];
    for (let i = 0; i < buttonData.length; i++) {
      buttons.push(
        <button
          key={i}
          id={buttonData[i]["name"]}
          className={`btn ${buttonData[i]["buttonType"]}`}
          value={buttonData[i]["value"]}
          onClick={(e) => this.handleClick(e, "value")}
        >
          {buttonData[i]["value"]}
        </button>
      );
    }
    return <div id="calculator-div">{buttons}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pressNum: (num) => dispatch(pressNum(num)),
    pressOperator: (operator) => dispatch(pressOperator(operator)),
    pressEquals: () => dispatch(pressEquals()),
    pressClear: () => dispatch(pressClear()),
  };
};
export default connect(null, mapDispatchToProps)(Calculator);
