import { GenericUtils } from 'utils-stuff';
const gu = new GenericUtils({ locale: 'it-IT' })

// --- Dates
console.log(gu.date())
console.log(gu.date(null, "DDD DD, MMM YYYY"))
console.log(gu.date(null, "hh:mm:ss:f"))
console.log(gu.date(null, "MMM DD h.tt"))
console.log(gu.date(1221732346340, "YYYY-MM-DD HH:mm:ss"))
console.log(gu.date(new Date("2023/01/01"), "DD/MM/YY h:mm tt"))
console.log(gu.date('2023-11-12T19:37:14.157Z', "DDD DD-MM-YYYY, h:mm tt"))
console.log("");

console.log("Is String Valid:", gu.isStringValid(""));
console.log("Array Difference:", gu.arrayDiff([0,1,5], [3,5,6]));
console.log("");

console.log("Is Numeric True:", gu.isNumeric("143.56"));
console.log("Is Numeric True2:", gu.isNumeric("-13"));
console.log("Is Numeric False:", gu.isNumeric("12,3"));
console.log("Is Numeric False2:", gu.isNumeric("Not a number"));
console.log("");

console.log("Test Catch Good", (() => {
    try { return gu.resOk("Response string"); }
    catch(err) { return gu.resError(err); }
})())
console.log("Test Catch Error", (() => {
    try { throw new Error("Error Message"); }
    catch(err) { return gu.resError(err); }
})())
