import { DateLocales } from "../types/dater.types";
import { ArrayDifference, CatchedResponse, GenericType, GenericUtilsConstructor } from "../types/generic.types";
import { Dater } from "./Dater";


export interface IGenericUtils {
    date: (date?:string, format?:string, locale?:DateLocales) => string
    resOk: <T>(response:T) => CatchedResponse<T>
    resError:(err:any) => CatchedResponse<any>
    isAxiosOk: (res:{ status:number, [Key:string]: GenericType} /* pass an AxiosResponse */) => boolean;
    isStringValid: (str?:string) => boolean;
    arrayDiff: <T = string | number>(originalArray:T[], currentArray:T[]) => ArrayDifference<T>;
    isNumeric: (str:string) => boolean;
    capitalize: (str:string, all?:boolean) => string;
    fromLetterToNumber: (char:string) => number;
}



export default class GenericUtils extends Dater implements IGenericUtils
{
    protected readonly defaultDateFormat:string = "YYYY-MM-DD hh:mm:ss";
    protected readonly isNumericRegex:RegExp = /^-?\d+(\.\d+)?$/
    constructor(constructor?:GenericUtilsConstructor) {
        super(constructor?.locale);
        this.isNumericRegex = constructor?.numericValidation ?? this.isNumericRegex
        this.defaultDateFormat = constructor?.defaultDateFormat ?? this.defaultDateFormat
    }



    fromLetterToNumber = (char:string) => {
        return char.toUpperCase().charCodeAt(0) - 64;
    }


    date = (date?:string | number | Date | null, format?:string, locale?:DateLocales):string => {
        const dateObj = !date ? new Date() : new Date(date);
        return this.formatDate(dateObj, format ?? this.defaultDateFormat, locale);
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
