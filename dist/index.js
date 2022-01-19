"use strict";
var rule_1 = require("./rule");
module.exports = function index(params) {
    var configuration = {
        /**
         * Resolve and load @commitlint/config-conventional from node_modules.
         * Referenced packages must be installed
         */
        // extends: ['@commitlint/config-conventional'],
        /**
         * Any rules defined here will override rules from @commitlint/config-conventional
         */
        // https://commitlint.js.org/#/reference-rules
        rules: {
            "local-plugin": [2, "always"],
        },
        /**
         * Functions that return true if commitlint should ignore the given message.
         */
        // ignores: [(commit) => commit === ''],
        /**
         * In case you want to develop your plugins locally without the need to publish to npm,
         * you can send declare your plugins inside your project locally.
         *
         * @NOTE: Please be aware that you can declare only one local plugin.
         */
        plugins: [
            {
                rules: {
                    "local-plugin": function (_a) {
                        var raw = _a.raw;
                        return (0, rule_1.validate)(raw, params);
                    },
                },
            },
        ],
    };
    return configuration;
};
