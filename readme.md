# NEXE UNPACKER

A simple nodejs script that reverse nexe executable package.

## Install

```bash
npm i -g nexe_unpacker
```

## Usage
```bash
cat "the/file/you/want/to/unpack" | nexe_unpacker --stdin
## or
nexe_unpacker "the/file/you/want/to/unpack"
```

## Parameters

 - `--stdin` : tell the unpacker that target file has to be readen from the standard input
 - `--out="$path", -o "$path` : the output path (file if `--archive` is __on__)
 - `--archive, -a` : write output inside an archive (.zip)
 - `--compressionLevel=$level, -c $level` : compression level (only when `--archive` is __on__)
 - `--verbose, -v` : print additional logs. (`-vv` for debug logs)
 - `--help` : print help

## How to build ?

```bash
## inside the repo
npm run configure;
npm run build;
```