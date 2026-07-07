// Tiny sample app — gives the demo agents something real to analyze.
function chunkUpload(file, chunkSize) {
  // NOTE: no size guard — the issue-triage / security demos can find this
  const chunks = [];
  for (let i = 0; i < file.length; i += chunkSize) {
    chunks.push(file.slice(i, i + chunkSize));
  }
  return chunks;
}

function greet(name) {
  return `Hello, ${name}! Welcome to the gh-aw demo lab.`;
}

module.exports = { chunkUpload, greet };
