export type NexeVirtualFileSystemElement = {
  filename: string,
  from: number,
  to: number
}

export type NexeVirtualFileSystem = NexeVirtualFileSystemElement[];

export type NexeVirtualFileSystemIterator = {
  next(): Iterator<[Buffer, NexeVirtualFileSystemElement]>;
  [Symbol.iterator](): Iterator<[Buffer, NexeVirtualFileSystemElement]>;
}