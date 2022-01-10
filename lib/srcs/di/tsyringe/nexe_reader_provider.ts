import { injectable } from "tsyringe";
import { NexeReader } from "../../unpacker/nexe_reader";
import { ConsoleLogger } from "./console_logger";

@injectable()
export class NexeReaderProvider extends NexeReader {
  constructor(
    logger: ConsoleLogger
  ) { super(logger); }
}