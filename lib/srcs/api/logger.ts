
export interface ILogger {
  log<T extends any[]>(...args: T): Promise<void>;
  warn<T extends any[]>(...args: T): Promise<void>;
  error<T extends any[]>(...args: T): Promise<void>;
}