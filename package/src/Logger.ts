import { WriteStream, createWriteStream } from "fs";
import { LogColors, LoggerConstructor } from "../types/generic.types";
import { DateLocales } from "../types/locales.types";

export interface ILogger {
    log: (message:any, color:LogColors) => void;
    logColor: (coloredMessage:any, ...messages:any[]) => void;
    logDetail: (...messages:any[]) => void;
    logError: (...errs:any[]) => void;

    logFile: (message:string, type?:"log" | "error", isClosing?:boolean) => void;
}


export default class Logger implements ILogger
{
    private readonly isDebug:boolean = true;
    private readonly fileStream:WriteStream = null!;
    protected readonly dateLocale:DateLocales = "it-IT";
    protected readonly primaryColor:LogColors = "cyan";
    constructor(data?:LoggerConstructor) {
        if (data?.logFilePath) this.fileStream = createWriteStream(data.logFilePath, { flags: 'a' });
        if (data?.debug) this.isDebug = data.debug;
        if (data?.locale) this.dateLocale = data.locale;
        if (data?.primaryColor) this.primaryColor = data.primaryColor;
    }


    protected readonly dateOptions: Intl.DateTimeFormatOptions | undefined = { day: '2-digit', month: '2-digit', year: 'numeric' };
    protected readonly timeOptions: Intl.DateTimeFormatOptions | undefined = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
    public readonly colors = {
        red: "\x1b[31m%s\x1b[0m",
        green: "\x1b[32m%s\x1b[0m",
        yellow: "\x1b[33m%s\x1b[0m",
        blue: "\x1b[34m%s\x1b[0m",
        magenta: "\x1b[35m%s\x1b[0m",
        cyan: "\x1b[36m%s\x1b[0m",
        gray: "\x1b[90m%s\x1b[0m"
    }



    getDateTimeString = () => {
        const dateObj = new Date();
        return `[${dateObj.toLocaleDateString(this.dateLocale, this.dateOptions)} ${dateObj.toLocaleTimeString(this.dateLocale, this.timeOptions)}]   `;
    }

    log = (message:any, color:LogColors) => {
        if (!this.isDebug) return;

        const dateString = this.getDateTimeString();
        if (!color) console.log(dateString, message);
        else {
            if (typeof message === "object") console.log(this.colors[color], `${dateString}${JSON.stringify(message, null, 2)}`);
            else console.log(this.colors[color], `${dateString}${message}`);
        }
    }

    logColor = (coloredMessage:any, ...messages:any[]) => {
        if (!this.isDebug) return;

        this.log(coloredMessage, this.primaryColor);
        for (let i = 0; i < messages.length; i++) {
            this.logDetail(messages[i]);
        }
    }


    logDetail = (...messages:any[]) => {
        if (!this.isDebug) return;

        for (const message of messages) {
            if (typeof message === "object") console.log(this.colors["gray"], JSON.stringify(message, null, 2));
            else console.log(this.colors["gray"], `${message}`);
        }
    }


    logError = (...errs:any) => {
        if (!this.isDebug) return;

        let errorMessage:string = null!;
        let stackTrace:string = null!;

        for(const err of errs) {
            if (err.message) errorMessage = err.message;
            if (err.stack) stackTrace = err.stack.split("\n")[1];

            if (!errorMessage) this.log(err, "red");
            else {
                this.log(errorMessage, "red")
                if (stackTrace) console.log(this.colors["gray"], stackTrace)
            }
        }
    }



    logFile = (message:string, type:"log" | "error" = "log", isClosing:boolean = true) => {
        if (!this.fileStream) return this.log("LOGFILE: Specify filepath destination in class constructor or function parameter", "red");

        const dateObj = new Date();
        const date = this.getDateTimeString().trim();
        const logType = type === "log" ? "  LOG" : "ERROR"
        this.fileStream.write(`${date}\t\t${logType}:  ${message}\n`);
        if (isClosing) this.fileStream.close();
    }
}
