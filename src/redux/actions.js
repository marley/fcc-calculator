import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  PRESS_NUM,
  PRESS_OPERATOR,
  PRESS_EQUALS,
  PRESS_CLEAR,
} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter },
});

export const pressNum = (num) => ({
  type: PRESS_NUM,
  payload: { num },
});

export const pressOperator = (operator) => ({
  type: PRESS_OPERATOR,
  payload: { operator },
});

export const pressEquals = () => ({
  type: PRESS_EQUALS,
  payload: { submit: true }, // TODO this will have to be unset at some point
});

export const pressClear = () => ({
  type: PRESS_CLEAR,
  payload: { clear: true }, // TODO this will have to be unset at some point
});
