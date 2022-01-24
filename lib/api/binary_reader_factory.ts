import { IBinaryReader } from './binary_reader';

export interface IBinaryReaderFactory {
  createReader(): IBinaryReader
}