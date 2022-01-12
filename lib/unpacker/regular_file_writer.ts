import { promises as fs } from "fs";
import { FileHandle } from "fs/promises";
import path from "path";
import { ILogger } from "../api/logger";

export class RegularFileWriter {
  private constructor(
    private _handle: FileHandle,
    private _logger?: ILogger
  ) {}

  async write(buffer: Buffer): Promise<void> {
    await this._handle.write(buffer);
  }

  async close() {
    await this._handle.close();
  }

  private static async checkFolder(dirname: string) {
    try {
      await fs.access(dirname);
    } catch {
      await fs.mkdir(dirname, { recursive: true });
    }
  }

  public static async make(filename: string, logger?: ILogger) {
    await this.checkFolder(path.dirname(filename));
    return new this(await fs.open(filename, "w"), logger);
  }
}