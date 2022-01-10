import { promises as fs } from "fs";
import path from "path";

export class FileWriter {
  private constructor(private _filename: string) {}

  async write(buffer: Buffer): Promise<void> {
    await fs.writeFile(this._filename, buffer);
  }

  async close() {
    return Promise.resolve();
  }

  private static async checkFolder(dirname: string) {
    try {
      await fs.access(dirname);
    } catch {
      await fs.mkdir(dirname, { recursive: true });
    }
  }

  public static async make(filename: string) {
    await this.checkFolder(path.dirname(filename));
    return new this(filename);
  }
}