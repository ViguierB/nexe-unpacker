import { IFileLoader } from "../api/file_loader";
import { ILogger } from "../api/logger";
import { promises as fs } from "fs";

export class RegularFileLoader implements IFileLoader {
  constructor(
    private _filename: string,
    private _logger: ILogger
  ) { }
  
  async load(): Promise<Buffer> {
    const buffer = await fs.readFile(this._filename, { flag: "r" });
    
    await this._logger.log(`${this._filename} has been successfully readen`);
    return buffer;
  }
  
}