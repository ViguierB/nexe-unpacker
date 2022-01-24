import { IFileLoader } from "../api/file_loader";
import { ILogger } from "../api/logger";
import { promises as fs } from "fs";

export class RegularFileLoader implements IFileLoader {
  constructor(
    private _filenames: string[],
    private _logger: ILogger
  ) { }
  
  async load(): Promise<[Buffer, string][]> {
    return Promise.all(this._filenames.map(async filename => {
      const buffer = await fs.readFile(filename, { flag: "r" });
      
      await this._logger.log(`${filename} has been successfully loaded`);
      return [ buffer, filename ];
    }));
  }
  
}