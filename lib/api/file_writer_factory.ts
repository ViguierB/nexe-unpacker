import { IFileWriter } from "./file_writer";

export interface IFileWriterFactory {
  prepare(): Promise<void>;
  close(): Promise<void>;
  addFile(filename: string): Promise<IFileWriter>
}