import {  ClientFilters, CatchedResponse, ClientFilter } from "utils-stuff"
import gu from "./utils";


// --- Logger

gu.log("Hello there, this is a log" + " " + gu.parseDate(), "blue");
gu.logFile("Hello there", "log", false);
gu.logFile("An Error", "error");


const functionResult = (function testCatch():CatchedResponse<boolean> {
    try { throw new Error("Test"); }
    catch(err) { return gu.catchResError(err); }
})()
gu.logColor("Test Catch", functionResult);

gu.logColor("Another test", { test: 1, test2: true, prova: { test3: [ "Hello", 2, false] } }, false, 12.3);
gu.logError("An incredible error", functionResult)






// --- Filter

interface ExampleFilter extends ClientFilter { startDate:Date, endDate:Date, type:number, active?:boolean }
const filter = new ClientFilters<ExampleFilter>({
    startDate: new Date(),
    endDate: new Date(),
    type: 2,
});

filter.values.active = true;
gu.logColor(filter.currentParams);


filter.values.active = undefined;
filter.values.startDate = new Date("5/30/2024 15:00")
gu.logColor(filter.currentParams);
