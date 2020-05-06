module.exports = {
    extends: "@cybozu/eslint-config/presets/typescript",
    rules: {
      // default
      'indent': ['warn', 2, { "SwitchCase": 1 }],
    //   indent: ["warn", 4, { SwitchCase: 0 }]
    }
  };
