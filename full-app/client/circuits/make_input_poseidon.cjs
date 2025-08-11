const fs = require('fs');
const path = require('path');

async function main() {
  // Option A: use installed circomlibjs
  const circomlibjs = require('circomlibjs');

  // Option B: use local circomlib folder (uncomment if you want).
  // const circomlibjs = require('./circomlib'); // adjust path if needed

  const poseidon = await circomlibjs.buildPoseidon();
  const F = poseidon.F; // field helpers

  const depth = 3; // matches your circuit component main = PoseidonMerkle(3)
  const leafCount = 1 << depth; // 8

  // Create sample leaves. You can replace these with real values.
  // Use small integers for convenience, convert to field elements.
  const leaves = [];
  for (let i = 0; i < leafCount; i++) {
    // create deterministic sample leaves (not hashed)
    leaves.push(F.e(1000 + i)); // F.e accepts Number or BigInt (wrapped)
  }

  // compute tree (bottom-up). tree[level][index]
  const tree = [];
  tree[0] = leaves;
  for (let level = 1; level <= depth; level++) {
    const prev = tree[level - 1];
    const row = [];
    for (let i = 0; i < prev.length; i += 2) {
      const left = prev[i];
      const right = prev[i + 1];
      const h = poseidon([left, right]);
      row.push(h);
    }
    tree[level] = row;
  }

  const root = tree[depth][0];

  // Which leaf to prove? take argument or default 0
  const leafIndex = parseInt(process.argv[2] ?? "0", 10);
  if (isNaN(leafIndex) || leafIndex < 0 || leafIndex >= leafCount) {
    console.error(`leafIndex must be 0..${leafCount - 1}`);
    process.exit(1);
  }

  // Build pathElements and pathIndices arrays for depth steps
  let idx = leafIndex;
  const pathElements = [];
  const pathIndices = [];

  for (let level = 0; level < depth; level++) {
    const siblingIndex = idx ^ 1;                // sibling index at this level
    const sibling = tree[level][siblingIndex];   // sibling value (field)
    pathElements.push(sibling);
    pathIndices.push(idx % 2 === 0 ? 0 : 1);     // 0 = current is left, 1 = right
    idx = Math.floor(idx / 2);                   // move up
  }

  // leaf value is the leaf element (field)
  const leaf = tree[0][leafIndex];

  // Prepare JSON-serializable strings (decimal strings)
  const toStr = (fe) => F.toString(fe); // returns decimal string

  const input = {
    leaf: toStr(leaf),
    root: toStr(root),
    pathElements: pathElements.map(toStr),
    pathIndices: pathIndices
  };

  // Ensure target folder exists
  const outDir = path.join(__dirname, 'proofOfProgress_js');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, 'input.json');
  fs.writeFileSync(outPath, JSON.stringify(input, null, 2), 'utf8');
  console.log('Wrote', outPath);
  console.log(JSON.stringify(input, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});