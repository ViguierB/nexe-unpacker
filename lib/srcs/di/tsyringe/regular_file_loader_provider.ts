import { injectable } from "tsyringe";
import { RegularFileLoader } from "../../unpacker/regular_file_loader";
import { ConsoleLogger } from "./console_logger";
import { ParametersProvider } from "./parameters_provider";

@injectable()
export class RegularFileLoaderProvider extends RegularFileLoader {
  constructor(
    p: ParametersProvider,
    logger: ConsoleLogger,
  ) {
    super(p.target!, logger);
  }
}