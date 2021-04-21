import {
  PRESS_NUM,
  PRESS_OPERATOR,
  PRESS_EQUALS,
  PRESS_CLEAR,
} from "../actionTypes";

const calculatorReducer = (state = "", action) => {
  console.log("REDUCER:");
  switch (action.type) {
    case PRESS_NUM: {
      // TODO let's just see if this works for now
      let input = "";
      let num = parseInt(action.payload);
      if (num === 0) {
        if (state !== "0") {
          input = `${state}${num}`;
        }
      } else {
        input = `${state}${num}`;
      }
      console.log(`input: ${input}`);
      return input;
    }
    case PRESS_OPERATOR: {
      // TODO let's just see if this works for now
      let input = "";
      let numbersOnly = /[0-9]/;
      if (state !== "0" || numbersOnly.test(state[state.length - 1])) {
        input = `${state}${action.payload}`;
      } else if (action.payload === "-") {
        input = `${action.payload}`;
      }
      return input;
    }
    case PRESS_EQUALS: {
      // TODO do a thing
      let input = "(equals)";
      return input;
    }
    case PRESS_CLEAR: {
      // TODO do a thing
      let input = "";
      return input;
    }
    default: {
      return state;
    }
  }
};

export default calculatorReducer;
