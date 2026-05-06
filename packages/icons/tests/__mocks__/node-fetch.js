const fetch = jest.fn();
module.exports = fetch;
module.exports.default = fetch;
module.exports.Response = class Response {
  /* Mock implementation for testing purposes */
};
