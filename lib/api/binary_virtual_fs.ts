export type BinaryVirtualFileSystemElement = {
  filename: string,
  from: number,
  to: number
}

export type BinaryVirtualFileSystem = BinaryVirtualFileSystemElement[];

export type BinaryVirtualFileSystemIterator = {
  next(): Iterator<[Buffer, BinaryVirtualFileSystemElement]>;
  [Symbol.iterator](): Iterator<[Buffer, BinaryVirtualFileSystemElement]>;
}