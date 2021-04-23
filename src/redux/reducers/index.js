import {
  PRESS_NUM,
  PRESS_OPERATOR,
  PRESS_EQUALS,
  PRESS_CLEAR,
} from "../actionTypes";
import MathNum from "../helpers/math";

const initialState = {
  input: "0",
  total: 0,
  currentNum: "0",
  lastOperator: "+",
};

const evaluate = (num, operator, total) => {
  // params: int/float, string, int/float
  let mathNum = new MathNum(`${num}`);
  let mathTotal = new MathNum(`${total}`);
  switch (operator) {
    case "+":
      return mathTotal.add(mathNum);
    case "-":
      return mathTotal.subtract(mathNum);
    case "*":
      return mathTotal.multiply(mathNum);
    case "/":
      return mathTotal.divide(mathNum);
    default:
      return "ERROR :(";
  }
};

// const updateCurrentNum = (state, payload) => {
//   /* As you press number keys, update */
//   let currentNum = `${state.currentNum}${payload}`;
//   let input = `${state.input}${payload}`;
//   return { currentNum };
// };

const updateTotal = (state, payload) => {
  /* if we reach operator or end of expression, then
  evaluate exp so far */
  let total = evaluate(state.currentNum, state.lastOperator, state.total);
  let lastOperator = payload; // update to next operator
  let currentNum = "";
  return { total, lastOperator, currentNum };
};

const calculatorReducer = (state = initialState, action) => {
  console.log("REDUCER:");
  switch (action.type) {
    case PRESS_NUM: {
      console.log("NUM", action.payload);
      let payload = action.payload;
      let input = state.input;
      let currentNum = state.currentNum;
      if (input !== "0") {
        input = `${state.input}${payload}`;
        currentNum = `${state.currentNum}${payload}`;
      } else {
        if (payload === "0") {
          // do nothing
          // input = state.input;
        } else {
          // replace state
          input = payload; // replace 0 with new number
          currentNum = payload;
        }
      }
      return { ...state, input, currentNum };
    }
    case PRESS_OPERATOR: {
      console.log("OPERATOR" + action.payload);
      let payload = action.payload;
      let input = state.input;
      let numbersOnly = /[0-9.]/;
      if (numbersOnly.test(input[input.length - 1])) {
        // append operator after any number
        input = `${input}${payload}`;
      } else {
        if (payload === "-" && input[input.length - 1] === "-") {
          // change two minu to plus
          input = `${input.slice(0, input.length - 1)}+`;
          payload = "+";
        } else {
          // default to last operator entered with new operator
          input = `${input.slice(0, input.length - 1)}${payload}`;
        }
      }
      let { total, lastOperator, currentNum } = updateTotal(state, payload);
      return { ...state, input, total, currentNum, lastOperator };
    }
    case PRESS_EQUALS: {
      // TODO all this assumes that user has correctly enter numbers, no 0/0 or ** etc
      console.log("EQUALS:");
      // updateTotal
      let { total, lastOperator, currentNum } = updateTotal(state, "+");
      // set input to total
      return { ...state, input: total, total, currentNum, lastOperator };
    }
    case PRESS_CLEAR: {
      return {
        ...state,
        input: "0",
        total: 0,
        currentNum: "0",
        lastOperator: "+",
      };
    }
    default: {
      console.log("DEFAULT");
      return state;
    }
  }
};

export default calculatorReducer;
