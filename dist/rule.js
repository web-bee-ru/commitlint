"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
    "chore", // @NOTE: should be moved in the starter-project
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
        errors.push("Use one of COMMIT_TYPES: ".concat(commitTypes, " (example: \"").concat(commitTypes[0], ": issue description\")"));
        errors.push("Or add ISSUE_PREFIXES: ".concat(issuePrefixes, " in commit message (example: \"").concat(issuePrefixes[0], "123: issue description\")"));
    }
    else {
        if (type && commitTypes.includes(type) === false) {
            errors.push("Unknown commit type: \"".concat(type, "\". Use one of the following: ").concat(commitTypes));
        }
        if (!type && refs.length === 0) {
            errors.push("There are no allowed Issue-references in Commit-message. Use one of the following: ".concat(issuePrefixes));
        }
    }
    // console.info(commit);
    return result(errors.length === 0, __spreadArray([
        "There are some errors reported by commitlint:"
    ], errors.map(function (error) { return "- ".concat(error); }), true).join("\n      "));
}
exports.validate = validate;
function result(isPassed, notPassedMessage) {
    return [isPassed, notPassedMessage];
}
