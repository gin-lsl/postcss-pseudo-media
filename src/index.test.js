const postcss = require("postcss");
const { equal } = require("uvu/assert");
const { test } = require("uvu");

const plugin = require("./index.js");

// TODO: add more tests

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  equal(result.css, output);
  equal(result.warnings().length, 0);
}

test("converts :xs to @media (max-width: 768px)", async () => {
  await run(
    `
    .btn {
      width: 100px;

      :xs {
        width: 50px;
      }
    }
    `,

    `
    .btn {
      width: 100px;

      @media (max-width: 768px) {
        width: 50px;
      }
    }
    `
  );
});

test.run();
