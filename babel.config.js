module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src/screens': './src/screens',
          '@src/navigators': './src/navigators',
        },
      },
    ],
  ],
};
