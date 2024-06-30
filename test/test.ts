import {  ClientFilters } from "utils-stuff"
import gu from "./utils";
import { CatchedResponse, ClientFilter } from "../package/types/generic.types";


gu.log("Hello there, this is a log" + " " + gu.parseDate(), "blue");
gu.logFile("Hello there", "log", false);
gu.logFile("An Error", "error");
gu.log(testCatch(), "cyan"); // Whatever is not string, is not colored

function testCatch():CatchedResponse<boolean> {
    try { throw new EvalError("Test"); }
    catch(err) { return gu.catchResError(err); }
}



interface ExampleFilter extends ClientFilter { startDate:Date, endDate:Date, type:number, active?:boolean }
const filter = new ClientFilters<ExampleFilter>({
    startDate: new Date(),
    endDate: new Date(),
    type: 2,
});

filter.values.active = true;
gu.log(filter.currentParams, "cyan");


filter.values.active = undefined;
filter.values.startDate = new Date("5/30/2024 15:00")
gu.log(filter.currentParams, "cyan");
