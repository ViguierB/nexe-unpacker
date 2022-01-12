import { injectable } from "tsyringe";
import { RegularFileWriterFactory } from "../../unpacker/regular_file_writer_factory";
import { ConsoleLogger } from "./console_logger";

@injectable()
export class RegularFileWriterFactoryProvider extends RegularFileWriterFactory {
  constructor(
    logger: ConsoleLogger
  ) { super(logger); }
}