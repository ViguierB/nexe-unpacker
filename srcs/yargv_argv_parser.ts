import yargs from 'yargs';
import { LogLevel } from '../lib/api/log_level';
import { IParameters } from '../lib/api/parameters';

export async function getArgv(argv: string[]) {
  const usage = 'Usage:\n  $0 [options] <target>';
  let parameters = {} as IParameters;

  const procArgsBuilder = yargs(argv)
    .usage(usage)
    .options('verbose', {
      alias: "v",
      count: true
    })
    .options("stdin", {
      boolean: true,
      default: false,
      desc: "input file should be given from stdin (true if target is not provided)"
    })
    .options("out", {
      alias: "o",
      string: true,
      default: "./out"
    })
    .options("archive", {
      alias: "a",
      desc: "write extracted files into an archive",
      boolean: true,
      default: false,
    })
    .options("compressionLevel", {
      alias: "c",
      desc: "if archive is true, set the archive compression level",
      number: true,
      default: 9
    })
    .options("stdout", {
      boolean: true,
      default: false,
      desc: "the output archive is redirected to the standard output (only when --archive is activated)"
    })
  
    .help();

  const procArgs = await procArgsBuilder.argv;

  parameters.logLevel = Math.min(procArgs.verbose, LogLevel.DEBUG);
  parameters.out = procArgs.out;
  parameters.target = (procArgs._.filter(v => typeof v === "string") as string[]) || [];
  parameters.stdin = procArgs.stdin;
  parameters.archive = procArgs.archive;
  parameters.stdout =  procArgs.archive && procArgs.stdout;
  parameters.compressionLevel = procArgs.compressionLevel;

  if (parameters.stdin) {
    parameters.target = undefined;
  }

  if (!parameters.stdin && !parameters.target) {
    throw new Error("You must provide an input file !")
  }

  return parameters;
}