import { injectable } from "tsyringe";
import { Unpacker } from "../../unpacker/unpacker";
import { ConsoleLogger } from "./console_logger";
import { FileWriterFactoryProvider } from "./file_writer_factory_provider";
import { LoaderProvider } from "./loader_provider";
import { NexeReaderProvider } from "./nexe_reader_provider";
import { ParametersProvider } from "./parameters_provider";

@injectable() 
export class UnpackerProvider extends Unpacker {
  constructor(
    parameters: ParametersProvider,
    consoleLogger: ConsoleLogger,
    loaderProvider: LoaderProvider,
    nexeReader: NexeReaderProvider,
    fileWriterFactory: FileWriterFactoryProvider,
  ) {
    super(parameters, consoleLogger, loaderProvider.fileLoader, nexeReader, fileWriterFactory.fileWriterFactory);
  }
}