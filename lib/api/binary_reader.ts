import { BinaryVirtualFileSystemIterator } from './binary_virtual_fs';

export interface IBinaryReader extends BinaryVirtualFileSystemIterator {
  readonly isFileLoaded: boolean;

  read(buffer: Buffer): Promise<void>;
}