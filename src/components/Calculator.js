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
    console.log(event.target.value);
    if (/[0-9]/.test(val)) {
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
    return (
      <div>
        <button value={5} onClick={(e) => this.handleClick(e, "value")}>
          5
        </button>
        <button value={"+"} onClick={(e) => this.handleClick(e, "value")}>
          +
        </button>
        <button value={"="} onClick={(e) => this.handleClick(e, "value")}>
          =
        </button>
        <button value={"C"} onClick={(e) => this.handleClick(e, "value")}>
          C
        </button>
      </div>
    );
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
