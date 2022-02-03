"use strict";
var types_1 = require("@commitlint/types");
module.exports = function index(params) {
    var configuration = {
        /**
         * Resolve and load @commitlint/config-conventional from node_modules.
         * Referenced packages must be installed
         */
        /**
         * Any rules defined here will override rules from @commitlint/config-conventional
         */
        extends: ["@commitlint/config-conventional"],
        // https://commitlint.js.org/#/reference-rules
        rules: {
            "type-enum": [types_1.RuleConfigSeverity.Error, "always", params.commitTypes],
            "subject-case": [types_1.RuleConfigSeverity.Disabled],
        },
    };
    return configuration;
};
