import { ILogger } from "../api/logger";
import { INexeReader, NexeVirtualFileSystem, NexeVirtualFileSystemElement } from "../api/nexe_reader";

const DOUBLE_LENGTH = 8;
const FSTABLE_LENGTH = 16;

export class NexeReader implements INexeReader {
  private _codeBuffer?: Buffer;
  private _bundleBuffer?: Buffer;
  private _offset = 0;
  
  public get _fullBuffer() {
    if (!this._codeBuffer || !this._bundleBuffer) {
      return undefined;
    }
    return Buffer.concat([this._codeBuffer, this._bundleBuffer]);
  }

  private _virtualFileSystem?: NexeVirtualFileSystem;
  get virtualFileSystem() {
    return this._virtualFileSystem;
  };

  constructor(
    private _logger: ILogger
  ) { }
  
  get isFileLoaded() { return !!this._virtualFileSystem; }

  /**
   * Work but ugly as fck !
   * Should be changed to something stronger !
   */
  private parseTable() {
    const head = "!(function () {process.__nexe = ";
    const to = this._codeBuffer?.indexOf(";")!;
    const code = this._codeBuffer?.subarray(head.length, to).toLocaleString()!;
    const table: { resources: { [path: string]: [number, number] } } = JSON.parse(code);
    
    this._virtualFileSystem = Object.keys(table.resources).map(key => ({
      filename: key,
      from: table.resources[key][0],
      to: table.resources[key][1],
    }));
  }
  
  async read(buffer: Buffer): Promise<void> {
    const padding = '<nexe~~sentinel>'.length + FSTABLE_LENGTH,
          fsTable = buffer.subarray(buffer.length - FSTABLE_LENGTH, buffer.length),
          codeSize = fsTable.readDoubleLE(0),
          bundleSize = fsTable.readDoubleLE(DOUBLE_LENGTH)
    ;
    
    this._codeBuffer = buffer.subarray(buffer.length - (codeSize + bundleSize + padding), buffer.length - (bundleSize + padding));
    this._bundleBuffer = buffer.subarray(buffer.length - (bundleSize + padding), buffer.length - (padding));

    this._logger.log("File has been loaded: ", { codeSize, bundleSize });

    this.parseTable();
  }
  
  async foreachAsync(func: (element: NexeVirtualFileSystemElement, buffer: Buffer) => Promise<void>): Promise<void> {
    const fsbuffer = this._bundleBuffer;

    if (!fsbuffer) {
      throw new Error("please run the read() member before !")
    }

    await Promise.all(
      this.virtualFileSystem!.map(async e => {
        const buffer = fsbuffer.subarray(e.from, e.from + e.to);
  
        await func(e, buffer);
      })
    );
  }
}