import {  CatchedResponse } from "utils-stuff"
import gu from "./utils";

const dateNow = gu.parseDate();
const isStrValid = gu.isStringValid("");
const arrayDifference = gu.arrayDiff([0,1,5], [3,5,6])
const isNumericTrue = gu.isNumeric("143.56");
const isNumericFalse = gu.isNumeric("12,3");
const isNumericFalse2 = gu.isNumeric("Not a number");
const isNumericFalse3 = gu.isNumeric("-13");

const testCatchGood = (function testCatchGood():CatchedResponse<string> {
    try { return gu.resOk("Response string"); }
    catch(err) { return gu.resError(err); }
})();
const testCatchResponse = (function testCatch():CatchedResponse<boolean> {
    try { throw new Error("Error Message"); }
    catch(err) { return gu.resError(err); }
})();


console.log(dateNow)
console.log(isStrValid)
console.log(arrayDifference)
console.log(isNumericTrue)
console.log(isNumericFalse)
console.log(isNumericFalse2)
console.log(isNumericFalse3)

console.log(testCatchGood);
console.log(testCatchResponse);
