import yargs from 'yargs';
import { LogLevel } from '@lib/api/log_level';
import { IParameters } from '@lib/api/parameters';

export async function getArgv(argv: string[]) {
  const usage = 'Usage:\n  $0 [options]';
  let parameters = {} as IParameters;

  const procArgsBuilder = yargs(argv)
    .usage(usage)
    .options('verbose', {
      alias: "v",
      count: true
    })
    .options("target", {
      alias: "t" ,
      string: true,
      desc: "The nexe file that has to be unpacked"
    })
    .options("stdin", {
      boolean: true,
      default: false,
      desc: "input file should be given from stdin (true if target is not provided)"
    })
    .options("out-dir", {
      alias: "o",
      string: true,
      default: "./out"
    })
    .help();

  const procArgs = await procArgsBuilder.argv;

  parameters.logLevel = Math.min(procArgs.verbose, LogLevel.DEBUG);
  parameters.outdir = procArgs['out-dir'];
  parameters.target = procArgs.target;
  parameters.stdin = procArgs.stdin || !parameters.target;

  if (parameters.stdin) {
    parameters.target = undefined;
  }

  return parameters;
}