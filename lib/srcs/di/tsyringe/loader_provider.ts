import { DependencyContainer } from "tsyringe";
import { IFileLoader } from "../../api/file_loader";
import { ParametersProvider } from "./parameters_provider";
import { RegularFileLoaderProvider } from "./regular_file_loader_provider";
import { StdinLoaderProvider } from "./stdin_loader_provider";

export class LoaderProvider {
  private _fileLoader?: IFileLoader;
  public get fileLoader() {
    if (!this._fileLoader) {
      const p = this._c.resolve(ParametersProvider);
      this._fileLoader = this._c.resolve(p.stdin ? StdinLoaderProvider : RegularFileLoaderProvider)
    }

    return this._fileLoader!;
  }
  
  constructor(
    private _c: DependencyContainer
  ) { }
}