import { IFileWriter } from "../api/file_writer";
import { IFileWriterFactory } from "../api/file_writer_factory";
import { ILogger } from "../api/logger";
import { IParameters } from "../api/parameters";
import { ArchiveFileWriter } from "./archive_file_writer";
import fs from "fs";
import archiver from "archiver"

export class ArchiveFileWriterFactory implements IFileWriterFactory {

  private _archive?: archiver.Archiver;
  private _output?: fs.WriteStream;

  constructor(
    private _parameters: IParameters,
    private _logger: ILogger
  ) {
    
  }

  private prepareFile() {
    this._output = fs.createWriteStream(this._parameters.out);
    
    return this._output;
  }

  async prepare() {
    this._archive = archiver('zip', {
      gzip: true,
      zlib: { level: this._parameters.compressionLevel }
    });

    this._archive.on('error', function(err) {
      throw err;
    });

    let out = (this._parameters.stdout)
      ? process.stdout
      : this.prepareFile()
    
    this._archive.pipe(out);
  }

  async addFile(filename: string): Promise<IFileWriter> {
    if (!this._archive) {
      this.prepare();
    }
    return new ArchiveFileWriter(filename, this._archive!, this._logger)
  }

  async close() {
    await this._archive?.finalize();
    this._archive = undefined;
    this._output = undefined;
  }
}