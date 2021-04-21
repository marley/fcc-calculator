import {
  PRESS_NUM,
  PRESS_OPERATOR,
  PRESS_EQUALS,
  PRESS_CLEAR,
} from "../actionTypes";

const evaluate = (num, operator, total) => {
  // params: int/float, string, int/float
  switch (operator) {
    case "+":
      return total + num;
    case "-":
      return total - num;
    case "*":
      return total * num;
    case "/":
      return total / num;
    default:
      return "ERROR :(";
  }
};

const setFirstOperator = (exp) => {
  if (exp[0] === "-") {
    // if first num is negative, we start iteration at 1
    return { operator: "-", i: 1 };
  } else {
    return { operator: "+", i: 0 };
  }
};

const calculatorReducer = (state = "0", action) => {
  console.log("REDUCER:");
  switch (action.type) {
    case PRESS_NUM: {
      let input = "0";
      let num = parseInt(action.payload);
      if (state !== "0") {
        input = `${state}${num}`;
      } else {
        if (num === 0) {
          // do nothing
          input = state;
        } else {
          // replace state
          input = `${num}`; // replace 0 with new number
        }
      }
      console.log(`input: ${input}`);
      return input;
    }
    case PRESS_OPERATOR: {
      // TODO let's just see if this works for now
      console.log("Operators" + action.payload);
      let input = "";
      let operator = action.payload;
      let numbersOnly = /[0-9]/;
      if (state !== "0") {
        console.log("1");
        input = `${state}${operator}`;
      } else if (operator === "-") {
        console.log("A special case");
        input = `${operator}`;
      } else if (numbersOnly.test(state[state.length - 1])) {
        console.log(state[state.length - 1] + "is a number");
        console.log("2");
        input = `${state}${operator}`;
      }
      return input;
    }
    case PRESS_EQUALS: {
      // TODO all this assumes that user has correctly enter numbers, no 0/0 or ** etc
      console.log("EQUALS:");
      let input = "";
      // let numRx = /[0-9]+(.[0-9]+)?/;
      let numRx = /[0-9.]/;
      let { i, operator } = setFirstOperator(state);
      let currentNum = "";
      let total = 0;
      while (i < state.length) {
        if (numRx.test(state[i]) && i < state.length - 1) {
          let digitOrDecimal = state[i];
          currentNum += digitOrDecimal;
        } else {
          /* if we reach operator or end of expression, then
          evaluate exp so far */
          if (numRx.test(state[i])) {
            let digitOrDecimal = state[i];
            currentNum += digitOrDecimal;
          }
          console.log(
            `reached ${state[i]} time to evaluate ${operator} and ${currentNum}`
          );
          let num = parseInt(currentNum); // TODO make this work for floats
          total = evaluate(num, operator, total);
          if (i < state.length - 1) {
            operator = state[i];
            currentNum = "";
          }
        }
        i++;
      }
      return input + total;
    }
    case PRESS_CLEAR: {
      let input = "0";
      return input;
    }
    default: {
      return state;
    }
  }
};

export default calculatorReducer;
