import "reflect-metadata";
import { IParameters } from "../../api/parameters";
import { container } from "tsyringe";
import { UnpackerProvider } from "./unpacker_provider";
import { ParametersProvider } from "./parameters_provider";
import { ConsoleLogger } from "./console_logger";
import { LoaderProvider } from "./loader_provider";
import { NexeReaderProvider } from "./nexe_reader_provider";

export function makeUnpackerContainer(parameters: IParameters) {
  const unpackerContainer = container.createChildContainer();

  unpackerContainer
    .register(ParametersProvider, { useFactory: () => new ParametersProvider(parameters) })
    .register(LoaderProvider, { useFactory: (c) => new LoaderProvider(c) })
    .register(ConsoleLogger, { useClass: ConsoleLogger })
    .register(NexeReaderProvider, { useClass: NexeReaderProvider })
    .register(UnpackerProvider, { useClass: UnpackerProvider })
  ;

  return unpackerContainer;
}