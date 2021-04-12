import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  add,
  subtract,
  incrementByAmount,
  // multiply,
  // divide,
  selectTotal,
} from "./operations";
import styles from "./Counter.module.css";

export function Counter() {
  const count = useSelector(selectTotal);
  const dispatch = useDispatch();
  const [operatorAmount, setOperatorAmount] = useState("0");

  const operatorValue = Number(operatorAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Add value"
          onClick={() => dispatch(add(5))}
        >
          +
        </button>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={operatorAmount}
          onChange={(e) => setOperatorAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(add(operatorValue))}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
