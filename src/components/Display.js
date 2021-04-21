import React from "react";
import { connect } from "react-redux";
// import {
//   pressNum,
//   pressOperator,
//   pressEquals,
//   pressClear,
// } from "../redux/actions";
import { getInput } from "../redux/selectors";

const Display = ({ input }) => <div id="display">{input}</div>;

const mapStateToProps = (state) => {
  const input = getInput(state);
  console.log("Display: GETTING INPUT" + input);
  return { input };
};

export default connect(mapStateToProps)(Display);
