import { injectable } from "tsyringe";
import { ILogger } from "../../api/logger";
import { LogLevel } from "../../api/log_level";
import { ParametersProvider } from "./parameters_provider";

@injectable()
export class ConsoleLogger implements ILogger {

  constructor(
    private _parameters: ParametersProvider
  ) { }
  
  private _doLog<T extends any[]>(logFunction: any, args: T): Promise<void> {
    logFunction(...args);
    return Promise.resolve();
  }

  public async log<T extends any[]>(...args: T): Promise<void> {
    if (this._parameters.logLevel >= LogLevel.DEBUG) {
      return this._doLog(console.log.bind(console), args);
    }
  }

  public async warn<T extends any[]>(...args: T): Promise<void> {
    if (this._parameters.logLevel >= LogLevel.QUIET) {
      return this._doLog(console.warn.bind(console), args);
    }
  }

  public async error<T extends any[]>(...args: T): Promise<void> {
    return this._doLog(console.error.bind(console), args);
  }
  
}