export interface IGitHubRepository {
  createCommentAtPR: (
    repoOwner: string,
    repoName: string,
    pullRequestNumber: number,
    message: string
  ) => Promise<object>;
  getDefaultBranch: (repoOwner: string, repoName: string) => Promise<string>;
  getBaseBranch: (
    repoOwner: string,
    repoName: string,
    pullRequestNumber: number
  ) => Promise<string>;
  getLastCommitDefaultBranch: (
    repoOwner: string,
    repoName: string
  ) => Promise<Date>;
  getLastCommitBranchBase: (
    repoOwner: string,
    repoName: string,
    branchRef: string
  ) => Promise<Date>;
}
