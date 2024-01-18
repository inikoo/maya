module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~/Components': './src/Components',
          '~/Screens': './src/Screens',
          '~/assests': './src/assets',
          '~/Constant' : './src/Constant',
          '~/Utils' : './src/Utils',
          '~/Store' : './src/Store'
        },
      },
    ],
  ]
};
