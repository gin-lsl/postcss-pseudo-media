// postcss plugins

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts) => {
  return {
    postcssPlugin: "postcss-pseudo-media",
    prepare() {
      const mapper = {
        xs: `@media (max-width: ${opts.xs || 768}px)`,
        sm: `@media (max-width: ${opts.sm || 768}px)`,
        md: `@media (max-width: ${opts.md || 992}px)`,
        lg: `@media (max-width: ${opts.lg || 1200}px)`,
      };

      return {
        Rule(node) {
          switch (node.selector) {
            case ":xs":
              node.selector = mapper.xs;
              break;

            case ":sm":
              node.selector = mapper.sm;
              break;

            case ":md":
              node.selector = mapper.md;
              break;

            case ":lg":
              node.selector = mapper.lg;
              break;

            default:
          }
        },
      };
    },
  };
};

module.exports.postcss = true;
