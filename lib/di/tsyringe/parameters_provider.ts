import { injectable } from "tsyringe";
import { LogLevel } from "../../api/log_level";
import { IParameters } from "../../api/parameters";

@injectable()
export class ParametersProvider implements IParameters {
  target?: string | undefined;
  stdin!: boolean;
  stdout!: boolean;
  out!: string;
  logLevel!: LogLevel;
  archive!: boolean;
  compressionLevel!: number;
  
  constructor(
    parameters: IParameters
  ) {
    Object.assign(this, parameters);
  }
}