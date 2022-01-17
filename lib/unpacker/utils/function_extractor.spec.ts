import assert from 'assert';
import { extractAutoFunctionFormBuffer } from './function_extractor';

const t1 = `
  (function () { })()
`

const t2 = `
  (function () { console.log("pepperoni pizza"); })()
`

const multi = t1 + t2;

describe('function_extractor', () => {
  it('should extact an auto function', () => {
    let gen = extractAutoFunctionFormBuffer(Buffer.from(t1));
    let it = gen.next();
    let buff = it.value as Buffer

    assert(!it.done, "not func was found");
    assert.equal(buff.toLocaleString().trim(), t1.trim());
  })

  it('should extact multiple auto functions', () => {
    let gen = extractAutoFunctionFormBuffer(Buffer.from(multi));
    let it1 = gen.next();
    let buff1 = it1.value as Buffer

    assert(!it1.done, "not func was found");

    let it2 = gen.next();
    let buff2 = it2.value as Buffer

    assert(!it2.done, "not func was found");

    assert.equal(buff1.toLocaleString().trim(), t1.trim());
    assert.equal(buff2.toLocaleString().trim(), t2.trim());
  })
})