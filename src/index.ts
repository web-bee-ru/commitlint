import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

type RuleParams = {
  commitTypes?: string[];
};

export = function index(params: RuleParams) {
  const configuration: UserConfig = {
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
      "type-enum": [RuleConfigSeverity.Error, "always", params.commitTypes],
      "subject-case": [RuleConfigSeverity.Disabled],
    },
  };
  return configuration;
};
