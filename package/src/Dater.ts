import { DateLocales, FormatUnit } from "../types/dater.types";

export class Dater
{
    public readonly dateLocale:DateLocales;
    constructor (locale?:DateLocales) { this.dateLocale = locale ?? "en-US"; }


    public capitalize = (str:string) => (!str) ? "" : str.charAt(0).toUpperCase() + str.slice(1);

    protected formatDate = (date:Date, format:string) => format.replace(/YYYY|YYY|YY|MMM|MM|M|DDD|DD|D|HH|H|hh|h|mm|m|ss|s|f|tt/g, match => this.mapFormatUnit(date, match as FormatUnit));
    private mapFormatUnit = (date:Date, key:FormatUnit):string=>
    {
        switch(key)
        {
            case "YYYY": return date.getFullYear().toString();
            case "YYY": return date.getFullYear().toString().slice(-1);
            case "YY": return date.getFullYear().toString().slice(-2);
            case "M": return (date.getMonth() + 1).toString();
            case "MM": return (date.getMonth() + 1).toString().padStart(2, '0');
            case "MMM": return this.capitalize(date.toLocaleString(this.dateLocale, { month: 'long' }));
            case "D": return date.getDate().toString();
            case "DD": return date.getDate().toString().padStart(2, '0');
            case "DDD": return this.capitalize(date.toLocaleString(this.dateLocale, { weekday: 'long' }));
            case "H": return date.getHours().toString();
            case "HH": return date.getHours().toString().padStart(2, '0');
            case "h": return ((date.getHours() >= 12) ? date.getHours()-12 : date.getHours()).toString();
            case "hh": return ((date.getHours() >= 12) ? date.getHours()-12 : date.getHours()).toString().padStart(2, '0');
            case "m": return date.getMinutes().toString();
            case "mm": return date.getMinutes().toString().padStart(2, '0');
            case "ss": return date.getSeconds().toString().padStart(2, '0');
            case "s": return date.getSeconds().toString();
            case "f": return date.getMilliseconds().toString().padStart(3, '0');
            case "tt": return date.getHours() >= 12 ? 'PM' : 'AM';

            default: return '';
        }
    }
}
