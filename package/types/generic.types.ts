import { DateLocales } from "./locales.types"

// --- Generic Utils
export interface GenericObject { [Key:string]: string | number | boolean | Date | GenericObject }

export type GenericType = string | number | boolean | Date | GenericObject

export interface CatchedResponse<T> { isOk:boolean, response: T | null, error?:string | null }

export interface PaginatedParams<T = null>{ currentPage:number, quantity:number, filter?:T }
export interface PaginatedResponse<T>{ totalPages:number, data:T }

export interface SelectOptions { id:string, text:string }




// --- Logger
export type LogColors = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "gray" | null

export interface LoggerConstructor { logFilePath?:string, debug?:boolean, locale?: DateLocales }



// --- Custom Navigation
export type ClientFilterTypes = string | number | Date | boolean | Array<string | number> | undefined
export interface ClientFilter { [Key:string]: ClientFilterTypes }
