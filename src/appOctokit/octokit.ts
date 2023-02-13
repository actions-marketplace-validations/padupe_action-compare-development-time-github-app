import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";
import { getInput } from "@actions/core";

export const gitHubApp = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    installationId: getInput("installationId"),
    appId: getInput("appId"),
    privateKey: getInput("privateKey").replace(/\\n/g, '\n'),
  },
});
