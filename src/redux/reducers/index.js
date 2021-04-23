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
  console.log({ num, operator, total });
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

const updateTotal = (state, payload, nextNumNegative) => {
  /* if we reach operator or end of expression, then
  evaluate exp so far */
  console.log("Update total:", state.lastOperator);
  let currentNum = state.currentNum;
  let total = state.total;
  if (currentNum.length > 0 && currentNum !== "-") {
    total = evaluate(currentNum, state.lastOperator, state.total);
    currentNum = "";
  } else if (nextNumNegative) {
    currentNum = "-";
  }
  let lastOperator = payload; // update to next operator

  return { total, lastOperator, currentNum };
};

const calculatorReducer = (state = initialState, action) => {
  console.log("============REDUCER:============");
  console.log(state);
  switch (action.type) {
    case PRESS_NUM: {
      let payload = action.payload;
      let input = state.input;
      let currentNum = state.currentNum;
      console.log(payload);
      if (payload === ".") {
        if (currentNum.indexOf(".") < 0) {
          // if no other decimal points, then can append
          input = `${state.input}${payload}`;
          currentNum = `${state.currentNum}${payload}`;
        }
      } else if (input !== "0") {
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
      let nextNumNegative = false;
      if (numbersOnly.test(input[input.length - 1])) {
        // append operator after any number
        input = `${input}${payload}`;
      } else {
        // 1 + 2 +-6/
        if (payload === "-") {
          input = `${input}${payload}`;
          nextNumNegative = true;
          console.log(nextNumNegative);
          payload = state.lastOperator;
        } else {
          // default to last operator entered with new operator
          input = `${input.slice(0, input.length - 1)}${payload}`;
        }
      }
      let { total, lastOperator, currentNum } = updateTotal(
        state,
        payload,
        nextNumNegative
      );
      return { ...state, input, total, currentNum, lastOperator };
    }
    case PRESS_EQUALS: {
      // TODO all this assumes that user has correctly enter numbers, no 0/0 or ** etc
      console.log("EQUALS:");
      // updateTotal
      let { total, lastOperator, currentNum } = updateTotal(state, "+");
      // set input to total
      return { ...state, input: `${total}`, total, currentNum, lastOperator };
    }
    case PRESS_CLEAR: {
      return {
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
