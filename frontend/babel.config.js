module.exports = {
  env: {
    development: {
      presets: [['@babel/preset-react', { development: true }]],
    },
  },
  presets: ['@babel/preset-env', '@babel/typescript' , '@babel/preset-react'],
  plugins: [
    [
      'babel-plugin-direct-import',
      {
        modules: ['@mui/system', '@mui/material', '@mui/icons-material', '@fontsource/roboto'],
      },
    ],
  ],
};
