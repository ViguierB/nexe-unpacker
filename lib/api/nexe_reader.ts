export type NexeVirtualFileSystemElement = {
  filename: string,
  from: number,
  to: number
}

export type NexeVirtualFileSystem = NexeVirtualFileSystemElement[];

export interface INexeReader {
  readonly virtualFileSystem?: NexeVirtualFileSystem;
  readonly isFileLoaded: boolean;

  read(buffer: Buffer): Promise<void>;
  foreachAsync(func: (element: NexeVirtualFileSystemElement, buffer: Buffer) => Promise<void>): Promise<void>;
}