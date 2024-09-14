# Utils Stuff



`v3.0.0`

This is a package i made for myself but can surely be helpful to others, feel free to contribute if you like it.

> [!WARNING]
> This lightest package between my 3 utils libraries.
> If you need excel js install[fast-js-excel](https://github.com/alessioVelluso/FastExcel) or take a look at [word-file-utils](https://github.com/alessioVelluso/WordFileUtils) if you need some file utilities without the use of exceljs library.
> **DO NOT INSTALL ALL THREE LIBS CAUSE ONE IS THE "PARENT" OF THE OTHER:**
> 1. `utils-stuff`
> 2. `utils-logger` (including utils-stuff)
> 3. `word-file-utils` (including utils-logger)
> 4. `fast-js-excel` (including exceljs, word-file-utils (including utils-stuff))
>
>So if you install word-file utils you don't need to install utils-logger and so on, choose the one for your pourpose.



## Install:

```bash
npm install utils-stuff
```

You can import two different classes, `GenericUtils` as default & `ClientFilters` .

**GenericUtils** has some generic utils and a logger that better format the logs (with color too if you want).
**ClientFilters** can help a client to trace filters parameter with the url, as the object storing the values is directly binded to the params/url string and whenever you edit a value, it automatically updates the url too.





At the moment, the interface of the class is as it follows:

```ts
export interface IGenericUtils {
    parseDate: (date?:string) => string
    resOk: <T>(response:T) => CatchedResponse<T>
    resError:(err:any) => CatchedResponse<any>
    isAxiosOk: (res:{ status:number, [Key:string]: GenericType} /* pass an AxiosResponse */) => boolean;
    isStringValid: (str?:string) => boolean;
    arrayDiff: <T = string | number>(originalArray:T[], currentArray:T[]) => ArrayDifference<T>;
    isNumeric: (str:string) => boolean;
}
```




## Initialize the class

```ts
import { GenericUtils } from "word-file-utils"
```
**GenericUtils:** I suggest you to create a generic utils class extending mine if you want a solid way to store all your utils functions or whatever.
You can find an example in the `test3/utils.ts` file in this repo.
The constructor of GenericUtils follows this interface:
```ts
protected readonly dateLocale:DateLocales = "en-US";
protected readonly isNumericRegex:RegExp = /^-?\d+(\.\d+)?$/
constructor(constructor?:GenericUtilsConstructor)
export interface GenericUtilsConstructor {
    locale?:DateLocales,
    numericValidation?:RegExp
}
```

While the logFilePath is required only if you have to write log files somewhere in prod, the debug flag is by default set to true and will avoid any logging in console if set to false *(for the log methods of this class)*.

```ts
import { GenericUtils } from "utils-stuff";

// Create a class extending mine if you want to store other utils
class MyGenericUtils extends GenericUtils {
	myCustomMethod = (name:string):string => {
		return `Hello ${name}`
	}
}
const mgu = new MyGenericUtils(/*{ locale: "it-IT" }*/)


// Or simply export mine directly
const gu = new GenericUtils(/*{ locale: "it-IT" }*/)
```

Export it however you want but i raccomand you to init a single object and use it through all the project.
```ts
export default new GenericUtils(/*{ locale: "it-IT" }*/)

// Or destruct the single functions
const gu = new GenericUtils(/*{ debug: env.DEBUG }*/)
const { resOk, resError, isStringValid } = gu;
export { resOk, resError, isStringValid }
```

The related methods are really simple and can be easily read in the realted `/package/src/GenericUtils.ts` file in this repo.
The only method not-so-easy to read is the `isNumeric` RegExp wich will return true if the passed string is any int, float, double or negative number.
