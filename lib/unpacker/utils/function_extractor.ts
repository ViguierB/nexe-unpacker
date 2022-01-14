
const PL_CHARCODE = "(".charCodeAt(0);
const PR_CHARCODE = ")".charCodeAt(0);

/**
 * extract all auto functions `(() => {...})()` in string
 * 
 * dot not handle internal string !! `(() => { console.log(")"); })()` will not be parsed properly
 * @param codeSection
 */
export function *extractAutoFunctionFormBuffer(codeSection: Buffer) {
  let offset = 0;
  let start = 0;
  let parenthesisCounter = 0;
  let it = codeSection[Symbol.iterator]();
  let found = false;
  let itResult: IteratorResult<number>;

  const walkToStart = () => {
    while (it.next().value !== PL_CHARCODE) { ++offset; }
    start = offset;
    ++offset; // the '('
    parenthesisCounter = 1;
  }

  walkToStart();
  while (!(itResult = it.next()).done) {
    const c = itResult.value;

    switch (c) {
      case PL_CHARCODE: ++parenthesisCounter; break;
      case PR_CHARCODE: found = (--parenthesisCounter <= 0); break;
    }

    ++offset;
    if (found) {
      found = false;
      offset += 2 /* the last "()" in (() => {...})() */
      it.next(); it.next();
      yield codeSection.subarray(start, offset);
      walkToStart();
    }
  }
}