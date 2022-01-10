import { injectable } from "tsyringe";
import { ILogger } from "../../api/logger";
import { LogLevel } from "../../api/log_level";
import { IParameters } from "../../api/parameters";

@injectable()
export class ParametersProvider implements IParameters {
  target?: string | undefined;
  stdin!: boolean;
  outdir!: string;
  logLevel!: LogLevel;
  
  constructor(
    parameters: IParameters
  ) {
    Object.assign(this, parameters);
  }
}