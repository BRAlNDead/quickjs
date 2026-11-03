// Run only when CONFIG_TEMPORAL_INTL is disabled at build time. Merely omitting
// qjs --experimental does not identify the compiled configuration.
function assert(actual, expected) {
    if (actual !== expected)
        throw Error(actual + ' !== ' + expected);
}
assert(typeof Intl, 'undefined');
assert([{ toLocaleString(...args) { assert(args.length, 0); return 'ok'; } }]
       .toLocaleString('en', {}), 'ok');
for (const [proto, array] of [[Number.prototype, new Uint8Array([1])],
                             [BigInt.prototype, new BigInt64Array([1n])]]) {
    const original = proto.toLocaleString;
    try {
        proto.toLocaleString = function (...args) { assert(args.length, 0); return 'ok'; };
        assert(array.toLocaleString('en', {}), 'ok');
    } finally {
        proto.toLocaleString = original;
    }
}
