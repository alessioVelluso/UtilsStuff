import { DateLocales } from "./dater.types"

// --- Generic Utils
export interface GenericObject { [Key:string]: GenericType }

export type GenericType = string | number | boolean | Date | Array<unknown> | object | undefined | null

export interface CatchedResponse<T> { isOk:boolean, response: T | null, error?:string | null }

export interface PaginatedParams<T = null>{ currentPage:number, quantity:number, filter?:T }
export interface PaginatedResponse<T>{ totalPages:number, data:T }

export type SelectOption<Key = string, Val = string> = { id:Key, text:Val }

export type ArrayDifference<T> = { removed:T[], added:T[], same:T[] }


export interface GenericUtilsConstructor {
    locale?:DateLocales,
    numericValidation?:RegExp,
    defaultDateFormat?:string
}
