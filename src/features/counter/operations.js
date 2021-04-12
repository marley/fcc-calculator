// REDUX
const ADD = "ADD";
const SUBTRACT = "SUBTRACT";
const MULTIPLY = "MULTIPLY";
const DIVIDE = "DIVIDE";

const addNumber = (num) => {
  return {
    type: ADD,
    num: num,
  };
};

const subtractNumber = (num) => {
  return {
    type: SUBTRACT,
    num: num,
  };
};

const multiplyNumber = (num) => {
  return {
    type: MULTIPLY,
    num: num,
  };
};

const divideNumber = (num) => {
  return {
    type: DIVIDE,
    num: num,
  };
};

const operationsReducer = (state = 0, action) => {
  // TODO: ERROR HANDLING
  switch (action.type) {
    case ADD:
      return state + action.num;
    case SUBTRACT:
      return state - action.num;
    case MULTIPLY:
      return state * action.num;
    case DIVIDE:
      return state / action.num;
    default:
      return state;
  }
};

export default operationsReducer;
