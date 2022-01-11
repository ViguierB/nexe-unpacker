export interface IFileWriter {
  write(buffer: Buffer): Promise<void>
  close(): Promise<void>
}