import { injectable } from "tsyringe";
import { NexeReaderFactory } from "../../unpacker/nexe_reader_factory";
import { ConsoleLogger } from "./console_logger";

@injectable()
export class NexeReaderFactoryProvider extends NexeReaderFactory {
  constructor(
    logger: ConsoleLogger
  ) { super(logger); }
}