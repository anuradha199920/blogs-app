// in webpack.config.js
const bufferutil = require("bufferutil");
const ut8Validate = require("utf-8-validate")
  module.exports = (phase, { defaultConfig }) => {
	return {
		externals: {
            bufferutil: bufferutil,
            "utf-8-validate": ut8Validate,
          }
	};
};
