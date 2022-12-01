import { OptimizeOptions } from "svgo";

export default {
  js2svg: {
    pretty: true,
  },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: "removeAttrs",
      params: {
        attrs: "(width|height|style)",
      },
    },
    /* {
      name: "removeDimensions",
    }, */
  ],
} as OptimizeOptions;
