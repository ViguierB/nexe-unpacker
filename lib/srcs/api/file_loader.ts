export interface IFileLoader {
  load(): Promise<Buffer>;
}