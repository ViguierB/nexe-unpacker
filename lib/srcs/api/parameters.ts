import { LogLevel } from "./log_level";

export interface IParameters {
  target?: string,
  stdin: boolean,
  outdir: string,
  logLevel: LogLevel,
}