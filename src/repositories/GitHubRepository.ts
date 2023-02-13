/* eslint-disable import/no-unresolved */
import { Octokit } from "@octokit/core";
import { gitHubApp } from "../appOctokit/octokit";
import { IGitHubRepository } from "./IGitHubRepository";
import { setFailed } from "@actions/core";

export class GitHubRepository implements IGitHubRepository {
  private readonly repository: Octokit;

  constructor() {
    this.repository = gitHubApp;
  }

  async createCommentAtPR(
    repoOwner: string,
    repoName: string,
    pullRequestNumber: number,
    message: string
  ): Promise<object> {
    const messagePr = await this.repository.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: repoOwner,
        repo: repoName,
        issue_number: pullRequestNumber,
        body: message,
      }
    );

    if (messagePr.status !== 201) {
      setFailed(`Error creating comment on pull request ${pullRequestNumber}.`);
    }

    return messagePr.data;
  }

  async getDefaultBranch(repoOwner: string, repoName: string): Promise<string> {
    const defaultBranch = await this.repository.request(
      "GET /repos/{owner}/{repo}",
      {
        owner: repoOwner,
        repo: repoName,
      }
    );

    return defaultBranch.data.default_branch;
  }

  async getBaseBranch(
    repoOwner: string,
    repoName: string,
    pullRequestNumber: number
  ): Promise<string> {
    const baseBranch = await this.repository.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner: repoOwner,
        repo: repoName,
        pull_number: pullRequestNumber,
      }
    );

    return baseBranch.data.head.ref;
  }

  async getLastCommitDefaultBranch(
    repoOwner: string,
    repoName: string
  ): Promise<Date> {
    const commits = await this.repository.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: repoOwner,
        repo: repoName,
      }
    );

    const lastCommit = commits?.data[0];

    if (!lastCommit) {
      setFailed('Failure at "getLastCommitBranchDefault".');
    }

    // @ts-ignore
    return new Date(lastCommit.commit.author!.date);
  }

  async getLastCommitBranchBase(
    repoOwner: string,
    repoName: string,
    branchRef: string
  ): Promise<Date> {
    const commits = await this.repository.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: repoOwner,
        repo: repoName,
      }
    );

    const lastCommit = commits.data[0];

    if (!lastCommit) {
      setFailed('Failure at "getLastCommitBranchDefault".');
    }

    // @ts-ignore
    return new Date(lastCommit.commit.author!.date);
  }
}
