import { ILogger } from "../api/logger";
import archiver from "archiver";

export class ArchiveFileWriter {
  constructor(
    private _filename: string,
    private _handle: archiver.Archiver,
    private _logger?: ILogger
  ) {}

  async write(buffer: Buffer): Promise<void> {
    this._handle.append(buffer, { name: this._filename })
  }

  close() {
    return Promise.resolve();
  }
}