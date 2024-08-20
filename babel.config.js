module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~/Components': './src/Components',
          '~/Screens': './src/Screens',
          '~/Utils': './src/Utils',
          '~/Store': './src/Store',
          '~/asset': './src/asset',
        },
        "extensions": [".js", ".jsx", ".es", ".es6", ".mjs", ".svg",".jpg",".png",".ts",".ts"],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};