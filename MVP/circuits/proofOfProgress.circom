pragma circom 2.0.0;

include "circomlib/circuits/sha256/sha256.circom";

template Select256() {
    signal input a[256];
    signal input b[256];
    signal input sel;
    signal output out[256];

    signal diff[256];
    for (var i = 0; i < 256; i++) {
        diff[i] <== b[i] - a[i];
        out[i] <== a[i] + sel * diff[i];
    }
}

template VerifyChain(depth) {
    signal input leaf[256];
    signal input root[256];
    signal input pathElements[depth][256];
    signal input pathIndices[depth];

    component hasher[depth];
    component selectorLeft[depth];
    component selectorRight[depth];

    signal intermediate[depth + 1][256];

    for (var j = 0; j < 256; j++) {
        intermediate[0][j] <== leaf[j];
    }

    for (var i = 0; i < depth; i++) {
        selectorLeft[i] = Select256();
        selectorRight[i] = Select256();

        selectorLeft[i].sel <== pathIndices[i];
        selectorRight[i].sel <== pathIndices[i];

        for (var j = 0; j < 256; j++) {
            selectorLeft[i].a[j] <== pathElements[i][j];
            selectorLeft[i].b[j] <== intermediate[i][j];

            selectorRight[i].a[j] <== intermediate[i][j];
            selectorRight[i].b[j] <== pathElements[i][j];
        }

        hasher[i] = Sha256(512);
        for (var j = 0; j < 256; j++) {
            hasher[i].in[j]       <== selectorLeft[i].out[j];
            hasher[i].in[256 + j] <== selectorRight[i].out[j];
        }

        for (var j = 0; j < 256; j++) {
            intermediate[i + 1][j] <== hasher[i].out[j];
        }
    }

    for (var i = 0; i < 256; i++) {
        root[i] === intermediate[depth][i];
    }
}

component main = VerifyChain(3);