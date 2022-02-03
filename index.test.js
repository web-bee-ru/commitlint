const commitlint = require("@commitlint/lint");
const config = require("./commitlint.config.js");
const load = require("@commitlint/load");

const lint = async (message) => {
  const preparedConfig = await load.default(config);
  return commitlint.default(message, preparedConfig.rules, {
    parserOpts: preparedConfig.parserPreset.parserOpts,
    ...preparedConfig,
  });
};

test("good-messages", async () => {
  const messages = [
    "ci: hello, world", // anti-prettier
    "feat!: hello, world", // breaking change
  ];
  for (let message of messages) {
    const result = await lint(message);
    expect(result.valid).toBe(true);
  }
});

test("no-type", async () => {
  const message = "hello, world";
  const result = await lint(message);
  expect(result.valid).toBe(false);
});

test("bad-type", async () => {
  const messages = [
    "bad: hello, world", // no such type
    "CI: hello, world", // wrong casing
    "ci:hello, world", // space required
    "ci - hello, world", // wrong delimeter
  ];
  for (let message of messages) {
    const result = await lint(message);
    expect(result.valid).toBe(false);
  }
});

test("referenced-word-inside-message", async () => {
  const messages = [
    "feat(GOOD-123)!: Add eslint autofix config", // "feat" inside message
    "fix: smth autofix config", // "fix" inside message
  ];
  for (let message of messages) {
    const result = await lint(message);
    expect(result.valid).toBe(true);
  }
});
