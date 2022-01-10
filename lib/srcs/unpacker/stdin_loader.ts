import { IFileLoader } from "../api/file_loader";

export class StdinLoader implements IFileLoader {
  load(): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];

      process.stdin.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      process.stdin.on("end", function () {
        resolve(Buffer.concat(chunks));
      });

      process.stdin.on("error", function (e) {
        reject(e);
      });
    });
  }
  
}