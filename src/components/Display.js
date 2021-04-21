import React from "react";
import { connect } from "react-redux";
// import {
//   pressNum,
//   pressOperator,
//   pressEquals,
//   pressClear,
// } from "../redux/actions";
import { getInput } from "../redux/selectors";

const Display = ({ input }) => <div className="display">{input}</div>;

const mapStateToProps = (state) => {
  console.log(state);
  const input = getInput(state);
  return { input };
};

export default connect(mapStateToProps)(Display);
