import { ILogger } from "../api/logger";
import { INexeReader, NexeVirtualFileSystem, NexeVirtualFileSystemElement } from "../api/nexe_reader";
import { extractFirstFunctionFormBuffer } from './utils/function_extractor';
import vm from 'vm';

const DOUBLE_LENGTH = 8;
const FSTABLE_LENGTH = 16;

export class NexeReader implements INexeReader {
  private _codeBuffer?: Buffer;
  private _bundleBuffer?: Buffer;
  
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

  private parseTableUsingVM() {
    if (!this._codeBuffer) {
      throw new Error("No nexe code was found !!");
    }

    const strScript = extractFirstFunctionFormBuffer(this._codeBuffer);
    const script = new vm.Script(strScript.toLocaleString());
    const context = {
      process: {
        __nexe: {} as { resources: { [path: string]: [number, number] } }
      }
    };

    vm.createContext(context);
    script.runInContext(context);
    this._virtualFileSystem = Object.keys(context.process.__nexe.resources).map(key => ({
      filename: key,
      from: context.process.__nexe.resources[key][0],
      to: context.process.__nexe.resources[key][1],
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

    
    this.parseTableUsingVM();
    this._logger.log("File has been loaded: ", { codeSize, bundleSize, files: this._virtualFileSystem?.length });
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