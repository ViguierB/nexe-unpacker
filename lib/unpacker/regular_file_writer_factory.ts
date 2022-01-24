import { IParameters } from "lib/api/parameters";
import path from "path";
import { IFileWriter } from "../api/file_writer";
import { IFileWriterFactory } from "../api/file_writer_factory";
import { ILogger } from "../api/logger";
import { RegularFileWriter } from "./regular_file_writer";

export class RegularFileWriterFactory implements IFileWriterFactory {

  constructor(
    private _parameters: IParameters,
    private _logger: ILogger
  ) { }

  prepare(): Promise<void> {
    return Promise.resolve();
  }
  
  close(): Promise<void> {
    return Promise.resolve();
  }

  async addFile(filename: string): Promise<IFileWriter> {
    return await RegularFileWriter.make(path.join(this._parameters.out, filename), this._logger);
  }
}