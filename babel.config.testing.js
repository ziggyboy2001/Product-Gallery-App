module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@navigation": "./src/navigation",
          "@context": "./src/context",
          "@api": "./src/api",
          "@types": "./src/types",
        },
      },
    ],
  ],
};
