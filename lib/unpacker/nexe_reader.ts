import { ILogger } from "../api/logger";
import { IBinaryReader } from "../api/binary_reader";
import { BinaryVirtualFileSystemElement } from "../api/binary_virtual_fs";
import { extractAutoFunctionFormBuffer } from './utils/function_extractor';
import vm from 'vm';

const DOUBLE_LENGTH = 8;
const FSTABLE_LENGTH = 16;

export class NexeReader implements IBinaryReader {
  private _codeBuffer?: Buffer;
  private _bundleBuffer?: Buffer;

  private _virtualFileSystem?: { [path: string]: [number, number] };

  constructor(
    private _logger: ILogger
  ) { }
  
  get isFileLoaded() { return !!this._virtualFileSystem; }

  private parseTableUsingVM() {
    if (!this._codeBuffer) {
      throw new Error("No nexe code was found !!");
    }

    const autoFuncParser = extractAutoFunctionFormBuffer(this._codeBuffer);
    const strScriptIt = autoFuncParser.next();
    
    if (!strScriptIt.done) {
      const script = new vm.Script(strScriptIt.value.toLocaleString());
      const context = {
        process: {
          __nexe: {} as { resources: { [path: string]: [number, number] } }
        }
      };
  
      vm.createContext(context);
      script.runInContext(context);
      this._virtualFileSystem = context.process.__nexe.resources;
    } else {
      throw new Error("Unable to find the nexe global setter function")
    }
  }
  
  async read(buffer: Buffer): Promise<void> {
    const padding = '<nexe~~sentinel>'.length + FSTABLE_LENGTH,
          fsTable = buffer.subarray(buffer.length - FSTABLE_LENGTH, buffer.length),
          codeSize = fsTable.readDoubleLE(0),
          bundleSize = fsTable.readDoubleLE(DOUBLE_LENGTH)
    ;
    
    this._codeBuffer = buffer.subarray(buffer.length - (codeSize + bundleSize + padding), buffer.length - (bundleSize + padding));
    this._bundleBuffer = buffer.subarray(buffer.length - (bundleSize + padding), buffer.length - (padding));

    this.parseTableUsingVM();
    this._logger.log("File has been loaded: ", { codeSize, bundleSize, files: this._virtualFileSystem?.length });
  }

  *next(): Iterator<[Buffer, BinaryVirtualFileSystemElement]> {
    const fsbuffer = this._bundleBuffer;

    if (!fsbuffer || !this._virtualFileSystem) {
      throw new Error(
        "Too soon! You have awakened me too soon, Executus!"
        + "\n"
        + "Run the INexeReader::read(Buffer) member before"
      );
    }

    for (let key of Object.keys(this._virtualFileSystem)) {
      const e = {
        filename: key,
        from: this._virtualFileSystem[key][0],
        to: this._virtualFileSystem[key][1],
      };
      const buffer = fsbuffer.subarray(e.from, e.from + e.to);
  
      yield [ buffer, e ] as [Buffer, BinaryVirtualFileSystemElement];
    }
  }

  [Symbol.iterator]() {
    return this.next();
  }
}