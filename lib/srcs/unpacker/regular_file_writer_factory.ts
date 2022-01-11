import { IFileWriter } from "../api/file_writer";
import { IFileWriterFactory } from "../api/file_writer_factory";
import { ILogger } from "../api/logger";
import { RegularFileWriter } from "./regular_file_writer";

export class RegularFileWriterFactory implements IFileWriterFactory {

  constructor(
    private _logger: ILogger
  ) { }

  prepare(): Promise<void> {
    return Promise.resolve();
  }
  
  close(): Promise<void> {
    return Promise.resolve();
  }

  async addFile(filename: string): Promise<IFileWriter> {
    return await RegularFileWriter.make(filename, this._logger);
  }
}