import { NexeVirtualFileSystemIterator } from './nexe_virtual_fs';

export interface INexeReader extends NexeVirtualFileSystemIterator {
  readonly isFileLoaded: boolean;

  read(buffer: Buffer): Promise<void>;
}