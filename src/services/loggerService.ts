import { injectable } from "inversify";
import "reflect-metadata";

export interface ILogger {
    Log(message: string): void
}

@injectable()
export class ConsoleLogger implements ILogger {
    Log(message: string): void {
        console.log(message);
    }
}
