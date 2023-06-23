module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];

  const plugins = [
    [
      "babel-plugin-direct-import",
      {
        modules: [
          "@mui/system",
          "@mui/material",
          "@mui/icons-material",
          "@fontsource/roboto",
        ],
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
