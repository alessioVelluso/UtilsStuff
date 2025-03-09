# Utils Stuff



`v4.5.0`

This is a package i made for myself but can surely be helpful to others, feel free to contribute if you like it.

> [!WARNING]
> This lightest package between my 3 utils libraries.
> If you need excel js install[fast-js-excel](https://github.com/alessioVelluso/FastExcel) or take a look at [word-file-utils](https://github.com/alessioVelluso/WordFileUtils) if you need some file utilities without the use of exceljs library.
> **DO NOT INSTALL ALL THREE LIBS CAUSE ONE IS THE "PARENT" OF THE OTHER:**
> 1. `utils-stuff`
> 2. `utils-logger-av` (including utils-stuff)
> 3. `word-file-utils` (including utils-logger)
> 4. `fast-js-excel` (including exceljs, word-file-utils (including utils-stuff))
>
>So if you install word-file utils you don't need to install utils-logger and so on, choose the one for your pourpose.



## Install:

```bash
npm install utils-stuff
```

You can import two different classes, `GenericUtils` as default & `ClientFilters` .

**GenericUtils** has some generic utils and a logger that better format the logs (with color too if you want).\
**ClientFilters** can help a client to trace filters parameter with the url, as the object storing the values is directly binded to the params/url string and whenever you edit a value, it automatically updates the url too.





At the moment, the interface of the class is as it follows:

```ts
export interface IGenericUtils {
    date: (date?:string, format?:string, locale?:DateLocales) => string
    resOk: <T>(response:T) => CatchedResponse<T>
    resError:(err:any) => CatchedResponse<any>
    getErrorMessage: (err:any) => string;
    catchReturn<T>(cb: () => Promise<T>): Promise<CatchedResponse<T>>;
    catchReturn<T>(cb: () => T): CatchedResponse<T>;
    isAxiosOk: (res:{ status:number, [Key:string]: GenericType} /* pass an AxiosResponse */) => boolean;
    isStringValid: (str?:string) => boolean;
    arrayDiff: <T = string | number>(originalArray:T[], currentArray:T[]) => ArrayDifference<T>;
    isNumeric: (str:string) => boolean;
    capitalize: (str:string, all?:boolean) => string;
    fromLetterToNumber: (char:string) => number;
    isEmptyObject: (obj:Record<string, any>) => boolean;
    getRandomColor: () => string;
    flattenObject: (obj:Record<string, any>) => Record<string, any>;
    sortObjects: <T = any>(arr:Array<Record<string, T>>, key:string | number) => Array<Record<string, T>>;
    keepTrying: <T = void>(finalError:string, methods: Array<() => Promise<T>>) => Promise<T>;
    sleep: (ms:number) => Promise<void>
    random: <T = any>(arr:Array<T>) => T
}
```




## Initialize the class

```ts
import { GenericUtils } from "utils-stuff"
```

The constructor of GenericUtils follows this interface:
```ts
protected readonly dateLocale:DateLocales = "en-US";
protected readonly isNumericRegex:RegExp = /^-?\d+(\.\d+)?$/
constructor(constructor?:GenericUtilsConstructor)
export interface GenericUtilsConstructor {
    locale?:DateLocales,
    numericValidation?:RegExp,
    defaultDateFormat?:string // for date parsing, default is "YYYY-MM-DD hh:mm:ss"
}
```

I suggest you to create a generic utils class extending mine if you want a solid way to store all your utils functions or whatever.
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
const { resOk, resError, isStringValid } = new GenericUtils();
export { resOk, resError, isStringValid }
```

## Methods

The related methods are really simple and can be easily read in the realted `/package/src/GenericUtils.ts` file in this repo.\
The only methods not-so-easy to read are the `date` method and the `isNumeric` RegExp wich will return true if the passed string is any int, float, double or negative number. You can override the default regex in the constructor.

### `date: (date?:string|number|Date|null, format?:string, locale?:DateLocales) => string`

This method takes a string or number that you would normally pass to a `Date()` constructor and an additional string param that let you format the date object into the string you want.\
If no locale parameter is passed, it will be used the one specified in the constructor of the class `GenericUtils({ locale:"..." })`.\
If no locale is passed in the class constructor it will be used `"en-US"`
> See the related locale options in `./package/types/dater.types.ts`


```ts
export type FormatUnit =
    | "YYYY"      // Year 4 digits (1996)
    | "YYY"       // Year 3 digits (996)
    | "YY"        // Year 2 digits (96)
    | "M"         // Month of year (1-12)
    | "MM"        // Month of year (01-12)
    | "MMM"       // Month of year (May) (set locale option)
    | "D"         // Day of month  (1-31)
    | "DD"        // Day of month  (01-31)
    | "DDD"       // Day of month  (Monday-Sunday) (set locale option)
    | "H"         // Hour of day   (0-23:59)
    | "HH"        // Hour of day   (00-23:59)
    | "h"         // Hour of day   (0-11:59)
    | "hh"        // Hour of day   (00-11:59)
    | "tt"        // AM or PM      (AM - PM)
    | "m"         // Minute        (0-59)
    | "mm"        // Minute        (00-59)
    | "s"         // Second        (0-59)
    | "ss"        // Second        (00-59)
    | "f"         // Milliseconds  (0000-999)
```
```ts
// --- Null or undefined is gonna be the current time
gu.date()
gu.date(null, "DDD DD, MMM YYYY")
gu.date(null, "DDD DD, MMM YYYY", "ru-RU")
gu.date(null, "hh:mm:ss:f")
gu.date(null, "MMM DD h.tt")
gu.date(1221732346340, "YYYY-MM-DD HH:mm:ss")
gu.date(new Date("2023/01/01"), "DD/MM/YY h:mm tt")
gu.date('2023-11-12T19:37:14.157Z', "DDD DD-MM-YYYY, h:mm tt")
```


### `keepTrying: <T = void>(finalError:string, methods: Array<() => Promise<T>>) => Promise<T>;`

This methods helps use assign a variable by trying/catching multiple functions that return the same value type (you can set two datatypes in | with typescript).
It takes two parameters:
1. **finalError**:
> If everything will go wrong it'll throw an error with your string as a message.
2. **methods**:
> A list of methods that possibly (encouraged) return the same datatype.

*This is a random example*
```ts
let compressedImageBytes = await keepTrying<Buffer>(`IMAGE == ${imagePath} == IS NOT JPG OR PNG`, [
    async () => await sharp(imagePath).jpeg({ quality:this.jpgCompression }).toBuffer(),
    async () => await sharp(imagePath).png({ compressionLevel: this.pngCompression }).toBuffer()
]);
```
