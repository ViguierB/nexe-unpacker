import { injectable } from "tsyringe";
import { RegularFileWriterFactory } from "../../unpacker/regular_file_writer_factory";
import { ConsoleLogger } from "./console_logger";
import { ParametersProvider } from "./parameters_provider";

@injectable()
export class RegularFileWriterFactoryProvider extends RegularFileWriterFactory {
  constructor(
    parameters: ParametersProvider,
    logger: ConsoleLogger
  ) { super(parameters, logger); }
}