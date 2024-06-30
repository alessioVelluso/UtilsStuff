import { GenericUtils } from "utils-stuff";

// You can override  it to use it a class for all your different utils, or simply use the default class like
// const gu = new GenericUtils();
// Anyway, i suggest it to use it in a static way, so creating a single object and exporting it for all the project.

class MyGenericUtils extends GenericUtils {
    hello(name:string):string {
        return `Hello ${name}`;
    }
}

export default new MyGenericUtils({
    debug:true,
    logFilePath: "../files/logs.txt"
});
