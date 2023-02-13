import { GitHubRepository } from "../repositories/GitHubRepository";
import { info, setOutput } from "@actions/core";

const gitHubRepository = new GitHubRepository();

function compareDate(baseDate: Date, lastDate: Date): number {
  const base = new Date(baseDate);
  const last = new Date(lastDate);

  const difference = last.getTime() - base.getTime();

  return Math.ceil(difference / (1000 * 3600 * 24));
}

export async function compareDevelopmentTime(
  repoOwner: string,
  repoName: string,
  pullRequestNumber: number
): Promise<void> {
  const branchDefault = await gitHubRepository.getDefaultBranch(
    repoOwner,
    repoName
  );
  const branchBase = await gitHubRepository.getBaseBranch(
    repoOwner,
    repoName,
    pullRequestNumber
  );
  const getDateDefaultBranch =
    await gitHubRepository.getLastCommitDefaultBranch(repoOwner, repoName);
  const getDateBranchEvent = await gitHubRepository.getLastCommitBranchBase(
    repoOwner,
    repoName,
    branchBase
  );

  const intervalData = compareDate(getDateDefaultBranch, getDateBranchEvent);

  await gitHubRepository.createCommentAtPR(
    repoOwner,
    repoName,
    pullRequestNumber,
    `This implementation has an interval of ${intervalData} days compared to branch ${branchDefault}.`
  );

  info(
    `This implementation has an interval of ${intervalData} days compared to branch ${branchDefault}.`
  );
  setOutput("interval", `${intervalData}`);
}
