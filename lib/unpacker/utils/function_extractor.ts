
const PL_CHARCODE = "(".charCodeAt(0);
const PR_CHARCODE = ")".charCodeAt(0);

export function extractFirstFunctionFormBuffer(codeSection: Buffer) {
  let offset = 0;
  let parenthesisCounter = 1;
  let it = codeSection[Symbol.iterator]();
  let cont = true;
  let itResult: IteratorResult<number>;

  while (it.next().value !== PL_CHARCODE) { ++offset; }
  for (;cont && !(itResult = it.next()).done; ++offset) {
    const c = itResult.value;

    switch (c) {
      case PL_CHARCODE: ++parenthesisCounter; break;
      case PR_CHARCODE: cont = --parenthesisCounter > 0; break;
    }
  }
  return codeSection.subarray(0, offset + 3 /* last char + "()" */);
}