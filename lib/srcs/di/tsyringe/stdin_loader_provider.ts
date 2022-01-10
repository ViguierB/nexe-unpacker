import { injectable } from "tsyringe";
import { StdinLoader } from "../../unpacker/stdin_loader";

@injectable()
export class StdinLoaderProvider extends StdinLoader {
}