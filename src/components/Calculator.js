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
      { name: "zero", value: 0 },
      { name: "one", value: 1 },
      { name: "two", value: 2 },
      { name: "three", value: 3 },
      { name: "four", value: 4 },
      { name: "five", value: 5 },
      { name: "six", value: 6 },
      { name: "seven", value: 7 },
      { name: "eight", value: 8 },
      { name: "nine", value: 9 },
      { name: "decimal", value: "." },
      { name: "add", value: "+" },
      { name: "subtract", value: "-" },
      { name: "multiply", value: "*" },
      { name: "divide", value: "/" },
      { name: "clear", value: "C" },
      { name: "equals", value: "=" },
    ];
    let buttons = [];
    for (let i = 0; i < buttonData.length; i++) {
      buttons.push(
        <button
          key={i}
          id={buttonData[i]["name"]}
          value={buttonData[i]["value"]}
          onClick={(e) => this.handleClick(e, "value")}
        >
          {buttonData[i]["value"]}
        </button>
      );
    }
    return <div>{buttons}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    pressNum: (num) => dispatch(pressNum(num)),
    pressOperator: (operator) => dispatch(pressOperator(operator)),
    pressEquals: () => dispatch(pressEquals()),
    pressClear: () => dispatch(pressClear()),
  };
};
export default connect(null, mapDispatchToProps)(Calculator);
