import { CatchedResponse, GenericType, LoggerConstructor } from "../types/generic.types";
import Logger from "./Logger";


export interface IGenericUtils {
    parseDate: (date?:string) => string
    catchRes: <T>(isOk:false, response:T | null, error?:string | null) => CatchedResponse<T>
    catchResError:(err:any) => CatchedResponse<any>
    isAxiosOk: (res:{ status:number, [Key:string]: GenericType} /* pass an AxiosResponse */) => boolean;
    isStringValid: (str?:string) => boolean;
    arrayDiff: <T = string | number>(originalArray:T[], currentArray:T[]) => { removed:T[], added:T[] };
    isNumeric: (str:string) => boolean;
}



export default class GenericUtils extends Logger implements IGenericUtils
{
    constructor(data?:LoggerConstructor) {
        super(data);
    }

    public readonly isNumericRegex:RegExp = /^-?\d+(\.\d+)?$/


    parseDate = (date?:string):string => {
        const dateObj = !date ? new Date() : new Date(date);
        return `${dateObj.toLocaleDateString(this.dateLocale, this.dateOptions)} ${dateObj.toLocaleTimeString(this.dateLocale, this.timeOptions)}`;
    };


    catchRes = <T = null>(isOk: boolean, response: T | null, error: string | null = null): CatchedResponse<T> => {
        return { isOk, response, error }
    };


    catchResError = (err:any):CatchedResponse<any> => {
        this.logError(err)
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


    arrayDiff = <T = string | number>(originalArray:T[], currentArray:T[]):{ removed:T[], added:T[] } => {
        const removed = originalArray.filter(x => !currentArray.includes(x));
        const added = currentArray.filter(x => !originalArray.includes(x));

        return { removed, added }
    }

    isNumeric = (str:string):boolean => {
		return this.isNumericRegex.test(str);
	}
}
