# Utils Stuff



`v1.1.1`

This is a package i made for myself but can surely be helpful to others, feel free to contribute if you like it.




## Install:

```bash
npm  install  utils-stuff
```



You can import two different classes, `GenericUtils` as default & `ClientFilters` .

**GenericUtils** has some generic utils and a logger that better format the logs (with color too if you want).
**ClientFilters** can help a client to trace filters parameter with the url, as the object storing the values is directly binded to the params/url string and whenever you edit a value, it automatically updates the url too.





At the moment, the interface of the class is as it follows:

```ts
interface IGenericUtils {
	parseDate: (date?:string) => string
	catchRes: <T>(isOk:false, response:T | null, error?:string | null) => CatchedResponse<T>
	catchResError:(err:any) => CatchedResponse<any>
	isAxiosOk: (res:{ status:number, [Key:string]: GenericType} /* pass an AxiosResponse */) => boolean;
	isStringValid: (str?:string) => boolean
	arrayDiff: <T = string | number>(originalArray:T[], currentArray:T[]) => { removed:T[], added:T[] };

	log: (message:any, color?:LogColors) => void;
	logFile: (message:string, type?:"log" | "error", isClosing?:boolean) => void;
	logError: (err:any) => string | any;
}



interface IClientFilters<T extends ClientFilter> {
	values:T
	currentParams:string;
	currentHref:string;
	currentWholeUrl:string;

	buildParams:() => string | null;
	buildWholeUrl:() => string | null;
	// setHref:() => string | null; --- private
}
```




## Initialize the class

```ts
import { GenericUtils , ClientFilters} from  "word-file-utils"
```
**GenericUtils:** I suggest you to create a generic utils class extending mine if you want a solid way to store all your utils functions or whatever.
You can find an example in the `test3/utils.ts` file in this repo.
The constructor of GenericUtils follows this interface:
```ts
constructor(data?:LoggerConstructor)
interface LoggerConstructor { logFilePath?:string, debug?:boolean, locale?: DateLocales }
```

While the logFilePath is required only if you have to write log files somewhere in prod, the debug flag is by default set to true and will avoid any logging in console if set to false *(for the log methods of this class)*. The locale flag refers to the date parsing.

The related methods are really simple and can be easily read in the realted `/package/src/GenericUtils.ts` file in this repo.


**ClientFilters**: For the ClientFilters class i reccomand you to initialize a new object every file that requires it.

I reccomand you to create a `/types/filters.ts` file to store all different filters interface you'll use through app as those can be helpful for queries or other logics.
```ts
interface ExampleFilter extends ClientFilter { startDate:Date, endDate:Date, type:number, active?:boolean }
interface AnotherFilter extends ClientFilter { startDate:Date, endDate:Date, name?:string }
```

To create a ClientFilters object consider this code:
```ts
const  filter = new  ClientFilters<ExampleFilter>({
	startDate: new Date(),
	endDate: new Date(),
	type: 2,
});
```
In this case we will have a `filter` object having:
1. `.values`: the current values of the filters (the ones specified in the constructors)
2. `.currentParams`: a string rapresenting the current values parsed as a param string (`?value1=1&value2=true`)
3. `.currentHref`: if the object is initialized in a client, this will be set as the related window.location.href value, else null.
4. `.currentWholeUrl`: if the currentHref is not null, this prop will hold the combination of currentHref and currentParams, else it will be null.




## Types

```ts
// --- Generic Utils
export interface GenericObject { [Key:string]: string | number | boolean | Date | GenericObject }
export type GenericType = string | number | boolean | Date | GenericObject
export interface CatchedResponse<T> { isOk:boolean, response: T | null, error?:string | null }
export interface PaginatedParams<T = null>{ currentPage:number, quantity:number, filter?:T }
export  interface  PaginatedResponse<T>{ totalPages:number, data:T }
export  interface  SelectOptions { id:string, text:string }


// --- Logger
export type LogColors = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "gray" | null
export interface LoggerConstructor { logFilePath?:string, debug?:boolean }


// --- Custom Navigation
export type ClientFilterTypes = string | number | Date | boolean | Array<string | number> | undefined
export  interface  ClientFilter { [Key:string]: ClientFilterTypes }
```
