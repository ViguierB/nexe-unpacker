import path from "path";
import { IFileLoader } from "../api/file_loader";
import { IFileWriterFactory } from "../api/file_writer_factory";
import { ILogger } from "../api/logger";
import { IBinaryReaderFactory } from "../api/binary_reader_factory";
import { IParameters } from "../api/parameters";
import { IUnpacker } from "../api/unpacker";

export class Unpacker implements IUnpacker {

  constructor(
    private _parameters: IParameters,
    private _logger: ILogger,
    private _fileLoader: IFileLoader,
    private _readerFactory: IBinaryReaderFactory,
    private _fileWriterFactory: IFileWriterFactory,
  ) {
    this._logger.log("Parameters: ", this._parameters);
  }

  async unpack(): Promise<void> {
    const cacheMap = new Map<string, number>();

    const entries = (await Promise.all((await this._fileLoader.load()).map(async ([ buffer, filename ], _, base) => {
      const reader = this._readerFactory.createReader();

      await reader.read(buffer)
      if (!reader.isFileLoaded) {
        throw new Error("file not loaded: ${reader.strError}");
      }

      const res = [ ...reader ];

      if (base.length > 1) {
        let basename = path.basename(filename);
        let val = 0;
  
        cacheMap.set(basename, (val = cacheMap.get(basename) || 0) + 1);
        if (val > 0) {
          basename += `_${val}`;
        } 
        res.forEach(([ _, fsEntry ]) => fsEntry.filename = path.join(basename, fsEntry.filename));
      }
      
      return res;
    }))).flat();

    await this._fileWriterFactory.prepare();
    await Promise.all(entries.map(async ([ buf, { filename } ]) => {
      this._logger.log(filename);
      const writer = await this._fileWriterFactory.addFile(filename);
  
      await writer.write(buf);
      await writer.close();
    }));
    await this._fileWriterFactory.close();
  }
  
}