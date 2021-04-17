import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTotal } from "./operations";
import styles from "./Calculator.css";

export function Display(props) {
  return <div id="display">{props.input}</div>;
}
