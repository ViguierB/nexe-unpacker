import { Stream } from "stream";
import { IBinaryReader } from "../api/binary_reader";
import { IBinaryReaderFactory } from "../api/binary_reader_factory";
import { ILogger } from "../api/logger";
import { NexeReader } from "./nexe_reader";

export class NexeReaderFactory implements IBinaryReaderFactory {

  constructor(private _logger: ILogger) { }

  createReader(): IBinaryReader {
    return new NexeReader(this._logger);
  }
  
}