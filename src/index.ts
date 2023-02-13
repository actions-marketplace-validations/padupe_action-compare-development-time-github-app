import { getInput, setFailed } from "@actions/core";
import * as github from "@actions/github";
import { compareDevelopmentTime } from "./service/compareDevelopmentTime";

const gitHubAppInstallationId = getInput("installationId");

async function run(): Promise<void> {
  try {
    if (gitHubAppInstallationId) {
      const pullRequestNumber = Number(github.context.ref.split("/")[2]);
      const repoOwner = github.context.payload.repository?.owner.login;
      const repoName = github.context.payload.repository?.name;

      // @ts-ignore
      await compareDevelopmentTime(repoOwner, repoName, pullRequestNumber);
    } else {
      setFailed("GitHub App Credentials is required!");
    }
  } catch (error) {
    setFailed(`Error at action: ${error}`);
  }
}

void run();
