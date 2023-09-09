// postcss plugins

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  const xs = `@media (max-width: ${opts.xs || 768}px) `;
  const sm = `@media (max-width: ${opts.sm || 768}px) `;
  const md = `@media (max-width: ${opts.md || 992}px) `;
  const lg = `@media (max-width: ${opts.lg || 1200}px) `;

  return {
    postcssPlugin: "postcss-pseudo-media",
    Rule(node) {
      const originSelector = node.selector;
      originSelector.replace(/:xs|:sm|:md|:lg/g, (match) => {
        const realSelector = originSelector.replace(match, "");

        node.selector = realSelector;

        /** @type {string} */
        let mediaSelector;

        switch (match) {
          case ":xs":
            mediaSelector = xs;
            break;

          case ":sm":
            mediaSelector = sm;
            break;

          case ":md":
            mediaSelector = md;
            break;

          case ":lg":
            mediaSelector = lg;
            break;

          default:
        }

        if (mediaSelector) {
          const mediaNode = node.clone({
            selector: mediaSelector,
            nodes: [node.clone()],
          });

          node.parent.insertBefore(node, mediaNode);
          node.remove();
        }
      });
    },
  };
};

module.exports.postcss = true;
