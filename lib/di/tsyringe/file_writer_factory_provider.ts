import { DependencyContainer, injectable } from "tsyringe";
import { IFileWriterFactory } from "../../api/file_writer_factory";
import { ArchiveFileWriterFactoryProvider } from "./archive_file_writer_factory_provider";
import { ParametersProvider } from "./parameters_provider";
import { RegularFileWriterFactoryProvider } from "./regular_file_writer_factory_provider";

@injectable()
export class FileWriterFactoryProvider {
  private _fileWriterFactory?: IFileWriterFactory;
  public get fileWriterFactory() {
    if (!this._fileWriterFactory) {
      const p = this._c.resolve(ParametersProvider);
      this._fileWriterFactory = this._c.resolve<IFileWriterFactory>(p.archive ? ArchiveFileWriterFactoryProvider : RegularFileWriterFactoryProvider)
    }

    return this._fileWriterFactory!;
  }
  
  constructor(
    private _c: DependencyContainer
  ) { }
}