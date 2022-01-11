import { injectable } from "tsyringe";
import { ArchiveFileWriterFactory } from "../../unpacker/archive_file_writer_factory";
import { ConsoleLogger } from "./console_logger";
import { ParametersProvider } from "./parameters_provider";

@injectable()
export class ArchiveFileWriterFactoryProvider extends ArchiveFileWriterFactory {
  constructor(
    parameters: ParametersProvider,
    logger: ConsoleLogger
  ) { super(parameters, logger); }
}