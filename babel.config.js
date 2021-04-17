module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./lib'], //表示哪个目录开始设置绝对路径
        alias: {
          //别名的配置
          '@': './lib',
          locales: './_locales',
        },
      },
    ],
  ],
};
