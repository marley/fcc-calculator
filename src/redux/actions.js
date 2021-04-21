import {
  PRESS_NUM,
  PRESS_OPERATOR,
  PRESS_EQUALS,
  PRESS_CLEAR,
} from "./actionTypes";

export const pressNum = (num) => ({
  type: PRESS_NUM,
  payload: num,
});

export const pressOperator = (operator) => ({
  type: PRESS_OPERATOR,
  payload: operator,
});

export const pressEquals = () => ({
  type: PRESS_EQUALS,
  payload: "=", // TODO this will have to be unset at some point
});

export const pressClear = () => ({
  type: PRESS_CLEAR,
  payload: "C", // TODO this will have to be unset at some point
});
