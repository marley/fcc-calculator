/* MathNum is a number that will accurately portray int and float values */

export default function MathNum(strValue) {
  this.storedValue = strValue;
  this.toString = function () {
    return this.storedValue;
  };
  this.decimalIndex = function () {
    // returns index of decimal or -1 if none
    return this.storedValue.indexOf(".");
  };
  this.decimalPlace = function () {
    // returns number of decimal places
    if (this.decimalIndex() < 0) {
      return 0;
    }
    return this.storedValue.length - 1 - this.decimalIndex();
  };

  this.mathValue = function (requiredDecimalPlace) {
    // remove decimal if needed
    let mathVal =
      this.decimalIndex() >= 0
        ? `${this.storedValue.slice(
            0,
            this.decimalIndex()
          )}${this.storedValue.slice(this.decimalIndex() + 1)}`
        : this.storedValue;

    if (this.decimalPlace() < requiredDecimalPlace) {
      let thisMany = requiredDecimalPlace - this.decimalPlace();
      mathVal += "0" * thisMany; // append as many zeroes as needed
    }

    return Math.round(parseInt(mathVal));
  };

  this.requiredDecimalPlace = function (otherNum) {
    return this.decimalPlace() >= otherNum.decimalPlace()
      ? this.decimalPlace()
      : otherNum.decimalPlace();
  };

  this.add = function (otherNum) {
    let multiplier = this.requiredDecimalPlace(otherNum);
    let result = this.mathValue(multiplier) + otherNum.mathValue(multiplier);
    return result / 10 ** multiplier;
  };

  this.subtract = function (otherNum) {
    let multiplier = this.requiredDecimalPlace(otherNum);
    let result = this.mathValue(multiplier) - otherNum.mathValue(multiplier);
    return result / 10 ** multiplier;
  };

  this.multiply = function (otherNum) {
    let multiplier = this.requiredDecimalPlace(otherNum);
    let result = this.mathValue(multiplier) * otherNum.mathValue(multiplier);
    /* After multiplying 2 decimals, you have to count the decimal places to
    know how many decimal places to give the result.  But this changes if one of
    the numbers is not a decimal, so we check that here:*/
    if (this.decimalIndex() >= 0 && otherNum.decimalIndex() >= 0) {
      return result / 10 ** (multiplier * 2);
    }
    return result / 10 ** multiplier;
  };

  this.divide = function (otherNum) {
    let multiplier = this.requiredDecimalPlace(otherNum);
    let result = this.mathValue(multiplier) / otherNum.mathValue(multiplier);
    return result;
  };
}

// // Test cases:
// let a = new MathNum("12.5");
// let b = new MathNum("1.02");

// console.log(a.add(b));
// console.log("Result should be 13.52");
// console.log(a.subtract(b));
// console.log("Result should be 11.48");
// console.log(a.multiply(b));
// console.log("Result should be 12.75");
// let c = new MathNum("0.05");
// let d = new MathNum("0.4");
// console.log(c.multiply(d));
// console.log("Result should be 0.02");
// let e = new MathNum("2");
// let f = new MathNum("4");
// console.log(a.divide(e));
// console.log("Result should be 6.25");
// console.log(a.divide(c));
// console.log("Result should be 250");
// console.log(e.add(f));
// console.log("Should be 6");
// let g = new MathNum("0");
// let h = new MathNum("80");
// console.log(g.add(h));
// console.log("Should be 80");
