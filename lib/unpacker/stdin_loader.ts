import { IFileLoader } from "../api/file_loader";

export class StdinLoader implements IFileLoader {
  load(): Promise<[Buffer, string][]> {
    return new Promise<[Buffer, string][]>((resolve, reject) => {
      const chunks: Buffer[] = [];

      process.stdin.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      process.stdin.on("end", function () {
        resolve([ [ Buffer.concat(chunks), "__stdin" ] ]);
      });

      process.stdin.on("error", function (e) {
        reject(e);
      });
    });
  }
  
}