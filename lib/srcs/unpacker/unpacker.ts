import path from "path";
import { IFileLoader } from "../api/file_loader";
import { IFileWriterFactory } from "../api/file_writer_factory";
import { ILogger } from "../api/logger";
import { INexeReader } from "../api/nexe_reader";
import { IParameters } from "../api/parameters";
import { IUnpacker } from "../api/unpacker";

export class Unpacker implements IUnpacker {

  constructor(
    private _parameters: IParameters,
    private _logger: ILogger,
    private _fileLoader: IFileLoader,
    private _reader: INexeReader,
    private _fileWriterFactory: IFileWriterFactory,
  ) {
    this._logger.log("Parameters: ", this._parameters);
  }

  async unpack(): Promise<void> {
    const buffer = await this._fileLoader.load();
    await this._reader.read(buffer);
    
    if (!this._reader.isFileLoaded) {
      throw new Error("file not loaded: ${this._reader.strError}");
    }

    await this._fileWriterFactory.prepare();
    await this._reader.foreachAsync(async (e, buffer) => {
      const outpath = path.join(this._parameters.out, e.filename);
      this._logger.log(outpath);
      const writer = await this._fileWriterFactory.addFile(outpath);

      await writer.write(buffer);
      await writer.close();
    });
    await this._fileWriterFactory.close();
  }
  
}