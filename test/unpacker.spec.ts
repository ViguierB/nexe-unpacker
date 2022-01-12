import { makeUnpackerContainer } from "../dist/lib/di/tsyringe/container";
import { UnpackerProvider } from "../dist/lib/di/tsyringe/unpacker_provider";
import { IParameters } from "../dist/lib/api/parameters";
import { IUnpacker } from "../dist/lib/api/unpacker";
import { LogLevel } from "../dist/lib/api/log_level";
import crypto from "crypto";
import { promises as fs } from "fs";
import assert from "assert";

async function doUnpack(parameters: IParameters) {
  const appContainer = makeUnpackerContainer(parameters);
  const unpacker = appContainer.resolve<IUnpacker>(UnpackerProvider);

  await unpacker.unpack();
}

async function getFileHash(filename: string) {
  var shasum = crypto.createHash('sha1')
  
  shasum.update(await fs.readFile(filename));
  return shasum.digest("hex").toLocaleLowerCase();
}

function getParameters(osBinName: string) {
  return {
    "archive": false,
    "compressionLevel": 0,
    "stdin": false,
    "logLevel": LogLevel.NONE,
    "out": `/tmp/out/${osBinName}`,
    "target": `./test/binaries/${osBinName}`
  }
}

describe("unpacker", function() {
  var expectedIndexJsHash = "08d6982da9d92398b7a912b4d70ae8f1ba8a15fb"

  async function unpackAndTestIndexJs(osBinName: string) {
    await doUnpack(getParameters(osBinName));

    var fileHash = await getFileHash(`/tmp/out/${osBinName}/index.js`)
    assert.equal(expectedIndexJsHash, fileHash);
  }

  this.afterAll(async function() {
    await fs.rm("/tmp/out", { recursive: true });
  });

  it("Should unpack linux x64 binary", async function() {
    var osBinName = "linux-x64"
    await unpackAndTestIndexJs(osBinName);
  });

  it("Should unpack linux x86 binary", async function() {
    var osBinName = "linux-x86"
    await unpackAndTestIndexJs(osBinName);
  });

  it("Should unpack win x64 binary", async function() {
    var osBinName = "win-x64.exe"
    await unpackAndTestIndexJs(osBinName);
  });

  it("Should unpack win x86 binary", async function() {
    var osBinName = "win-x86.exe"
    await unpackAndTestIndexJs(osBinName);
  });

  it("Should unpack macos binary", async function() {
    var osBinName = "macos"
    await unpackAndTestIndexJs(osBinName);
  });
});