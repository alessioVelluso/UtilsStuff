import { CatchedResponse, GenericType, DateLocales, ArrayDifference, GenericUtilsConstructor } from "../types/generic.types";


export interface IGenericUtils {
    parseDate: (date?:string) => string
    resOk: <T>(response:T) => CatchedResponse<T>
    resError:(err:any) => CatchedResponse<any>
    isAxiosOk: (res:{ status:number, [Key:string]: GenericType} /* pass an AxiosResponse */) => boolean;
    isStringValid: (str?:string) => boolean;
    arrayDiff: <T = string | number>(originalArray:T[], currentArray:T[]) => ArrayDifference<T>;
    isNumeric: (str:string) => boolean;
}



export default class GenericUtils implements IGenericUtils
{
    protected readonly dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    protected readonly timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

    protected readonly dateLocale:DateLocales = "en-US";
    protected readonly isNumericRegex:RegExp = /^-?\d+(\.\d+)?$/
    constructor(constructor?:GenericUtilsConstructor) {
        this.dateLocale = constructor?.locale ?? this.dateLocale
        this.isNumericRegex = constructor?.numericValidation ?? this.isNumericRegex
    }



    parseDate = (date?:string):string => {
        const dateObj = !date ? new Date() : new Date(date);
        return `${dateObj.toLocaleDateString(this.dateLocale, this.dateOptions)} ${dateObj.toLocaleTimeString(this.dateLocale, this.timeOptions)}`;
    };


    resOk = <T>(response: T): CatchedResponse<T> => {
        return { isOk:true, response, error:null }
    };


    resError = (err:any):CatchedResponse<any> => {
        return { isOk: false, response:null, error:err.message ? err.message : err }
    }


    isAxiosOk = (res:{ status:number, [Key:string]: GenericType}):boolean => {
        if (res.status !== 200 && res.status !== 201 && res.status !== 204) return false;
        else return true;
    };


    isStringValid = (str?:string):boolean => {
        if (str === undefined || str === null) return false;

        if (str.trim() === "") return false;
        else return true;
    }


    arrayDiff = <T = string | number>(originalArray:T[], currentArray:T[]):ArrayDifference<T> => {
        const added:T[] = [];
        const same:T[] = [];
        const removed = originalArray.filter(x => !currentArray.includes(x));

        for (const item of originalArray) {
            if (currentArray.includes(item)) same.push(item);
            else added.push(item);
        }

        return { removed, added, same }
    }

    isNumeric = (str:string):boolean => {
		return this.isNumericRegex.test(str);
	}
}
