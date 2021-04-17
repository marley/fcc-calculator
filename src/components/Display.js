import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleTodo } from "../redux/actions";

export function Display(props) {
  return <div id="display">{props.input}</div>;
}
