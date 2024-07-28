export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem' : {
      rootValue: 37.5,
      propList: ["*"],
      selectorBlackList: ["html"],
    },
    'postcss-preset-env': {},
  },
};
