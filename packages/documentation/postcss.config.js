const postcssPseudoClasses = require('./postcss-pseudo-classes.js');

module.exports = () => {
  return {
    plugins: [postcssPseudoClasses],
  };
};
