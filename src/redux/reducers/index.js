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
  didSubmit: false,
  showErrorMsg: false,
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

const updateTotal = ({
  state,
  payload,
  nextNumNegative = false,
  submitting = false,
}) => {
  let currentNum = state.currentNum;
  let total = state.total;
  let didSubmit = false;
  if (currentNum.length > 0 && currentNum !== "-") {
    total = evaluate(currentNum, state.lastOperator, state.total);
  }
  if (submitting) {
    currentNum = total;
    didSubmit = true;
  } else {
    // just updating current total
    if (nextNumNegative) {
      currentNum = "-";
    } else {
      currentNum = "";
    }
  }
  let lastOperator = payload; // update to next operator

  return { total, currentNum, lastOperator, didSubmit };
};

const inputTooLong = (input) => {
  console.log(`Length of ${input} == ${input.length}`);
  return input.length >= 12;
};

const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRESS_NUM: {
      let payload = action.payload;
      let input = state.input;
      let currentNum = state.currentNum;
      if (inputTooLong(state.input)) {
        state.showErrorMsg = true;
        return { ...state };
      }
      if (state.didSubmit) {
        // inputting new number after '=', clear slate
        input = payload;
        currentNum = payload;
        let total = 0;
        let lastOperator = "+";
        return {
          ...state,
          input,
          total,
          currentNum,
          lastOperator,
          didSubmit: false,
        };
      }
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
        if (payload !== "0") {
          input = payload; // replace 0 with new number
          currentNum = payload;
        }
      }
      return { ...state, input, currentNum };
    }
    case PRESS_OPERATOR: {
      let payload = action.payload;
      let input = state.input;
      let numbersOnly = /[0-9.]/;
      let nextNumNegative = false;
      if (inputTooLong(state.input)) {
        state.showErrorMsg = true;
        return { ...state };
      }
      if (state.didSubmit) {
        // if user enters operator right after equals
        input = `${input}${payload}`;
        let currentNum = "0";
        return {
          ...state,
          input,
          currentNum,
          lastOperator: payload,
          didSubmit: false,
        };
      }
      if (numbersOnly.test(input[input.length - 1])) {
        // append operator after any number
        input = `${input}${payload}`; // 2-
      } else {
        if (payload === "-") {
          // it's okay to add '-' after another operator
          input = `${input}${payload}`;
          nextNumNegative = true;
          payload = state.lastOperator;
        } else {
          // default to last operator entered with new operator
          if (
            input[input.length - 1] === "-" &&
            input[input.length - 1] !== state.lastOperator
          ) {
            // e.g. '5*-' < as you can see the lastOperator is *, but the last thing entered was a '-'
            input = `${input.slice(0, input.length - 2)}${payload}`;
          } else {
            input = `${input.slice(0, input.length - 1)}${payload}`;
          }
        }
      }
      let { total, currentNum, lastOperator, didSubmit } = updateTotal({
        state,
        payload,
        nextNumNegative,
      });
      return { ...state, input, total, currentNum, lastOperator, didSubmit };
    }
    case PRESS_EQUALS: {
      let { total, lastOperator, currentNum, didSubmit } = updateTotal({
        state,
        payload: "+",
        submitting: true,
      });
      let displayTotal = inputTooLong(`${total}`)
        ? `${total}`.slice(0, 12)
        : `${total}`;
      return {
        ...state,
        input: displayTotal,
        total,
        currentNum,
        lastOperator,
        didSubmit,
        showErrorMsg: false,
      };
    }
    case PRESS_CLEAR: {
      return {
        input: "0",
        total: 0,
        currentNum: "0",
        lastOperator: "+",
        didSubmit: false,
        showErrorMsg: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default calculatorReducer;
