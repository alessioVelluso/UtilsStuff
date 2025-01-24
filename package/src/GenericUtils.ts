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
    isEmptyObject: (obj:Record<string, any>) => boolean;
    getRandomColor: () => string;
    flattenObject: (obj:Record<string, any>) => Record<string, any>;
    sortObjects: <T = any>(arr:Array<Record<string, T>>, key:string | number) => Array<Record<string, T>>;
    keepTrying: <T = void>(finalError:string, methods: Array<() => Promise<T>>) => Promise<T>;
    sleep: (ms:number) => Promise<void>
    random: <T = any>(arr:Array<T>) => T
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



    fromLetterToNumber = (char:string) =>
    {
        return char.toUpperCase().charCodeAt(0) - 64;
    }


    date = (date?:string | number | Date | null, format?:string, locale?:DateLocales):string =>
    {
        const dateObj = !date ? new Date() : new Date(date);
        return this.formatDate(dateObj, format ?? this.defaultDateFormat, locale);
    };


    resOk = <T>(response: T): CatchedResponse<T> =>
    {
        return { isOk:true, response, error:null }
    };


    resError = (err:any):CatchedResponse<any> =>
    {
        return { isOk: false, response:null, error:err.message ? err.message : err }
    }


    isAxiosOk = (res:{ status:number, [Key:string]: GenericType}):boolean =>
    {
        if (res.status !== 200 && res.status !== 201 && res.status !== 204) return false;
        else return true;
    };


    isStringValid = (str?:string):boolean =>
    {
        if (str === undefined || str === null) return false;

        if (str.trim() === "") return false;
        else return true;
    };


    arrayDiff = <T = string | number>(originalArray:T[], currentArray:T[]):ArrayDifference<T> =>
    {
        const added:T[] = [];
        const same:T[] = [];
        const removed = originalArray.filter(x => !currentArray.includes(x));

        for (const item of originalArray) {
            if (currentArray.includes(item)) same.push(item);
            else added.push(item);
        }

        return { removed, added, same }
    }

    isNumeric = (str:string):boolean =>
    {
		return this.isNumericRegex.test(str);
	}

    isEmptyObject = (obj:Record<string, any>) =>
    {
        return Object.keys(obj).length === 0;
    };

    getRandomColor = () =>
    {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    flattenObject = (obj:Record<string, any>, prefix:string = '') =>
    {
        let flattened:Record<string, any> = {};

        for (let key in obj)
        {
            if (!obj.hasOwnProperty(key)) continue;

            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (typeof value === 'object' && value !== null && !Array.isArray(value))
            {
                Object.assign(flattened, this.flattenObject(value, newKey));
            }
            else if (Array.isArray(value))
            {
                value.forEach((item, index) => {
                    if (typeof item === 'object' && item !== null) Object.assign(flattened, this.flattenObject(item, `${newKey}[${index}]`));
                    else flattened[`${newKey}[${index}]`] = item;
                });
            }
            else
            {
                flattened[newKey] = value;
            }
        }

        return flattened;
    };

    sortObjects = <T = any>(arr: Array<Record<string, T>>, key: string | number) =>
    {
        return arr.sort((a:Record<string, any>, b:Record<string, any>) => (a[key] > b[key] ? 1 : -1));
    };

    keepTrying = async <T = void>(finalError:string, methods: Array<() => Promise<T>>):Promise<T> =>
    {
        for (const method of methods) {
            try { return await method(); }
            catch { }
        }

        throw new Error(finalError);
    }

    sleep = async (ms:number):Promise<void> =>
    {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    random = <T>(arr:Array<T>) =>
    {
        if (arr.length === 0) return null!;
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
