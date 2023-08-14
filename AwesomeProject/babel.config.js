module.exports = function(api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    // ...các plugin khác
  ];

  return {
    presets,
    plugins
  };
};
