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
  state, // currentNum: 2, didSubmit: true, input: "2", lastOperator: "+", total: 2
  payload, // -
  nextNumNegative = false, // false
  submitting = false, // false
}) => {
  /* if we reach operator or end of expression, then
  evaluate exp so far */
  /*
  what needs to happen:
  - if just evaluating interim value:
    > update total
    > set currentNum to "" or "-" if there nextNumNegative
  - if submitting:
    > update total
    > set currentNum to state.total
  whatever the case, update last operator to be payload
  */
  let currentNum = state.currentNum; // 2
  let total = state.total; //2
  let didSubmit = false;
  if (currentNum !== "-") {
    total = evaluate(currentNum, state.lastOperator, state.total); // 2, + , 2
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
  // let currentNum = state.currentNum;
  // let total = state.total;
  // if (currentNum.length > 0 && currentNum !== "-") {
  //   total = evaluate(currentNum, state.lastOperator, state.total);
  //   currentNum = "";
  // } else {
  //   if (nextNumNegative) {
  //     currentNum = "-";
  //   } else {
  //     currentNum = "";
  //   }
  // }
  let lastOperator = payload; // update to next operator

  return { total, currentNum, lastOperator, didSubmit };
};

const calculatorReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case PRESS_NUM: {
      let payload = action.payload;
      let input = state.input;
      let currentNum = state.currentNum;
      console.log(state.didSubmit);
      if (state.didSubmit) {
        console.log("DID SUMBIT");
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
      let payload = action.payload; //-
      let input = state.input; //2
      let numbersOnly = /[0-9.]/;
      let nextNumNegative = false;
      if (state.didSubmit) {
        // if user entering operator right after equals
        console.log("hi there");
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
        //true
        // append operator after any number
        input = `${input}${payload}`; // 2-
      } else {
        //
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
      } //state, - ,  false
      let { total, currentNum, lastOperator, didSubmit } = updateTotal({
        state,
        payload,
        nextNumNegative,
      });
      return { ...state, input, total, currentNum, lastOperator, didSubmit };
    }
    case PRESS_EQUALS: {
      // TODO all this assumes that user has correctly enter numbers, no 0/0 or ** etc
      // updateTotal
      let { total, lastOperator, currentNum, didSubmit } = updateTotal({
        state,
        payload: "+",
        submitting: true,
      });
      // set input to total
      return {
        ...state,
        input: `${total}`,
        total,
        currentNum,
        lastOperator,
        didSubmit,
      };
    }
    case PRESS_CLEAR: {
      return {
        input: "0",
        total: 0,
        currentNum: "0",
        lastOperator: "+",
        didSubmit: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default calculatorReducer;
