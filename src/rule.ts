import conventionalCommitsParser from "conventional-commits-parser";

export type CommitMessage = string;
export type RuleParams = {
  commitTypes?: string[];
  issuePrefixes?: string[];
};

const DEFAULT_COMMIT_TYPES = [
  "feat", // @NOTE: implementation of functionality
  "fix", // @NOTE: bugfix
  "wip", // @NOTE: work in progress
  "ci", // @NOTE: continuous integration related issues
  "chore", // @NOTE: should be moved in the starter-project
];

export function validate(
  message: CommitMessage,
  params: RuleParams
): [boolean, string] {
  let { issuePrefixes, commitTypes } = params;
  if (!issuePrefixes) {
    issuePrefixes = [];
  }
  if (!commitTypes) {
    commitTypes = DEFAULT_COMMIT_TYPES.slice();
  }
  // https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser
  const commit = conventionalCommitsParser.sync(message, {
    mergePattern: /^Merge (.*)$/,
    revertPattern: /^Revert (.*)$/,
    issuePrefixes: issuePrefixes,
    issuePrefixesCaseSensitive: true,
    referenceActions: null,
  });
  const refs = commit.references;
  const type = commit.type;
  const errors: string[] = [];
  if (refs.length === 0 && !type) {
    errors.push("Issue-reference or Commit-type is required");
    errors.push(
      `Use one of COMMIT_TYPES: ${commitTypes} (example: "${commitTypes[0]}: issue description")`
    );
    errors.push(
      `Or add ISSUE_PREFIXES: ${issuePrefixes} in commit message (example: "${issuePrefixes[0]}123: issue description")`
    );
  } else {
    if (type && commitTypes.includes(type) === false) {
      errors.push(
        `Unknown commit type: "${type}". Use one of the following: ${commitTypes}`
      );
    }
    if (!type && refs.length === 0) {
      errors.push(
        `There are no allowed Issue-references in Commit-message. Use one of the following: ${issuePrefixes}`
      );
    }
  }
  // console.info(commit);
  return result(
    errors.length === 0,
    [
      "There are some errors reported by commitlint:",
      ...errors.map((error) => `- ${error}`),
    ].join("\n      ")
  );
}

function result(
  isPassed: boolean,
  notPassedMessage?: string
): [boolean, string] {
  return [isPassed, notPassedMessage];
}
