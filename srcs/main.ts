import "reflect-metadata";
import { getArgv } from "./yargv_argv_parser";
import { makeUnpackerContainer } from "../lib/di/tsyringe/container";
import { IUnpacker } from "../lib/api/unpacker";
import { UnpackerProvider } from "../lib/di/tsyringe/unpacker_provider";

async function main() {
  const parameters = await getArgv(process.argv.slice(2));
  const appContainer = makeUnpackerContainer(parameters);
  const unpacker = appContainer.resolve<IUnpacker>(UnpackerProvider);

  await unpacker.unpack();
}

main();

export default {};