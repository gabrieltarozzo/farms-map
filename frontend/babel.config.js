module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: { '@': './src', '@app': './src/app' },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    }],
  ],
};