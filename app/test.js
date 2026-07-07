const { chunkUpload, greet } = require("./index.js");

let failures = 0;
function assertEqual(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.error(`FAIL ${label}: expected ${expected}, got ${actual}`);
    failures++;
  } else {
    console.log(`PASS ${label}`);
  }
}

assertEqual(greet("Ada"), "Hello, Ada! Welcome to the gh-aw demo lab.", "greet");
assertEqual(chunkUpload("abcdef", 2), ["ab", "cd", "ef"], "chunkUpload");

process.exit(failures ? 1 : 0);
