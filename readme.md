# NEXE UNPACKER

A simple nodejs script that reverse nexe executable package. (not tested on windows / macos but should work with minimal changes).

## How to build ?

```bash
## inside the repo
npm run configure; # basically run 'npm i'
npm run build;
```

## Usage

```bash
cat "the/file/you/want/to/unpack" | npm run start -- --stdin
## or
npm run start -- -t "the/file/you/want/to/unpack"
```