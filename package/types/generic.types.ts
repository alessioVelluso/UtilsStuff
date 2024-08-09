import { DateLocales } from "./locales.types"

// --- Generic Utils
export interface GenericObject { [Key:string]: GenericType }

export type GenericType = string | number | boolean | Date | Array<unknown> | object

export interface CatchedResponse<T> { isOk:boolean, response: T | null, error?:string | null }

export interface PaginatedParams<T = null>{ currentPage:number, quantity:number, filter?:T }
export interface PaginatedResponse<T>{ totalPages:number, data:T }

export type SelectOptions<Key = string, Val = string> = { id:Key, text:Val }




// --- Logger
export type LogColors = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "gray" | null

export interface LoggerConstructor { logFilePath?:string, debug?:boolean, locale?: DateLocales, primaryColor?:LogColors }



// --- Custom Navigation
export type ClientFilterTypes = string | number | Date | boolean | Array<string | number> | undefined
export interface ClientFilter { [Key:string]: ClientFilterTypes }
