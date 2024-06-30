import { ClientFilter, ClientFilterTypes } from "../types/generic.types";

export interface IClientFilters<T extends ClientFilter> {
    values:T
    currentParams:string;
    currentHref:string;
    currentWholeUrl:string;
    buildParams:() => string | null;
    buildWholeUrl:() => string | null;
    // setHref:() => string | null;         --- private
}

export default class GenericClientFilter<T extends ClientFilter> implements IClientFilters<T>
{
    constructor(filter: T) {
        this.values = new Proxy(filter, this.handler);
        this.currentParams = this.buildParams();
        this.currentHref = this.setHref();
        this.currentWholeUrl = this.buildWholeUrl();
    }


    public values = {} as T;
    public currentParams:string = null!;
    public currentHref:string = null!;
    public currentWholeUrl:string = null!;
    private readonly handler:ProxyHandler<T> = {
        get: (target: any, prop: string) => {
            if (prop in target) return target[prop];
            else return undefined;
        },
        set: (target: any, prop: string, value: any) => {
            target[prop] = value;
            this.currentParams = this.buildParams();
            this.currentWholeUrl = this.buildWholeUrl();
            return true;
        }
    };


    public buildParams = () => {
        const keys = Object.keys(this.values).filter(x => this.values[x] !== undefined);
        if (keys.length === 0) return null!;

        let params = "?";
        let key = "", value = "" as ClientFilterTypes;
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            value = this.values[key];
            if (value instanceof Date) value = value.toISOString();
            else if (Array.isArray(value)) value = value.join(",")

            params += `${key}=${value}`;
            if (i !== keys.length -1) params += "&";
        }

        return params;
    }

    public buildWholeUrl = () => {
        let wholeUrl:string = null!;
        if (this.currentHref !== null) {
            wholeUrl = this.currentHref;
            if (this.currentParams !== null) wholeUrl += this.currentParams;
        }

        return wholeUrl;
    }

    private setHref = () => {
        try { return window.location.href; }
        catch { return null!; }
    }
}
