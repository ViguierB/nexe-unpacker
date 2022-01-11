import { LogLevel } from "./log_level";

export interface IParameters {
  target?: string,
  stdin: boolean,
  out: string,
  logLevel: LogLevel,
  archive: boolean,
  compressionLevel: number,
}