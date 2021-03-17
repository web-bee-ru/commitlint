"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var conventional_commits_parser_1 = __importDefault(require("conventional-commits-parser"));
var DEFAULT_COMMIT_TYPES = [
    "feat",
    "fix",
    "wip",
    "ci",
    "chore",
    "build",
    "refactor",
    "docs",
    "perf",
    "style",
    "deps",
    "test", // @NOTE: tests
];
function validate(message, params) {
    var issuePrefixes = params.issuePrefixes, commitTypes = params.commitTypes;
    if (!issuePrefixes) {
        issuePrefixes = [];
    }
    if (!commitTypes) {
        commitTypes = DEFAULT_COMMIT_TYPES.slice();
    }
    // https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser
    var commit = conventional_commits_parser_1.default.sync(message, {
        mergePattern: /^Merge (.*)$/,
        revertPattern: /^Revert (.*)$/,
        issuePrefixes: issuePrefixes,
        issuePrefixesCaseSensitive: true,
    });
    var refs = commit.references;
    var type = commit.type;
    var errors = [];
    if (refs.length === 0 && !type) {
        errors.push("Issue-reference or Commit-type is required");
        errors.push("Use one of COMMIT_TYPES: " + commitTypes + " (example: \"" + commitTypes[0] + ": issue description\")");
        errors.push("Or add ISSUE_PREFIXES: " + issuePrefixes + " in commit message (example: \"" + issuePrefixes[0] + "123: issue description\")");
    }
    else {
        if (type && commitTypes.includes(type) === false) {
            errors.push("Unknown commit type: \"" + type + "\". Use one of the following: " + commitTypes);
        }
        if (!type && refs.length === 0) {
            errors.push("There are no allowed Issue-references in Commit-message. Use one of the following: " + issuePrefixes);
        }
    }
    // console.info(commit);
    return result(errors.length === 0, __spreadArray([
        "There are some errors reported by commitlint:"
    ], errors.map(function (error) { return "- " + error; })).join("\n      "));
}
exports.validate = validate;
function result(isPassed, notPassedMessage) {
    return [isPassed, notPassedMessage];
}
