const commitlint = require("@commitlint/lint");
const config = require("./commitlint.config.js");

const rules = config.rules;
const lint = (message) => {
  return commitlint.default(message, rules, config);
};

test("good-messages", async () => {
  const messages = [
    "ci: hello, world", // anti-prettier
    "GOOD-123: hello, world", // anti-prettier
  ];
  for (let message of messages) {
    const result = await lint(message);
    expect(result.valid, message).toBe(true);
  }
});

test("no-type-no-issue", async () => {
  const message = "hello, world";
  const result = await lint(message);
  expect(result.valid, message).toBe(false);
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
    expect(result.valid, message).toBe(false);
  }
});

test("bad-issue-type", async () => {
  const messages = [
    "BAD-123: hello, world", // no such issue-type
    "BAD-: hello, world", // no issue-number
    "BAD-asd: hello, world", // wrong issue-number
    "GOOD-: hello, world", // no issue-number
    "GOOD-asd: hello, world", // wrong issue-number
    "good-123: hello, world", // wrong casing
    // @TODO: not implemented, but useful
    // "GOOD-123:hello, world", // space required
    // "GOOD-123 - hello, world", // wrong delimeter
  ];
  for (let message of messages) {
    const result = await lint(message);
    expect(result.valid, message).toBe(false);
  }
});

test("referenced-word-inside-message", async () => {
  const messages = [
    "GOOD-123: Add eslint autofix config", // "fix" inside message
    "fix: smth autofix config", // "fix" inside message
  ];
  for (let message of messages) {
    const result = await lint(message);
    expect(result.valid, message).toBe(true);
  }
});
