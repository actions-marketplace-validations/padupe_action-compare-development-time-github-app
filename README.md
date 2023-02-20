# action-compare-development-time-github-app

## Index

- [Description](#description)
- [Requirements](#requiremets)
- [Use](#use)
  - [Usage for metrics through Git Flow](#usage-for-metrics-through-git-flow)
  - [General use](#general-use)
- [Output](#output)
- [Contribute to the Project](#contribute-to-the-project)

## Description

Action that returns the interval (in days) between the start of development and the opening of the Pull Request.

**NOTE**: This action performs a comment on the registered Pull Request.

![Example Comment](./assets/comment-example.jpeg)

## Requiremets

- [GitHub App](https://docs.github.com/en/apps)
  - Required Permissions:
    - **Repository**
      - Actions [Read and write]
      - Commit status [Read and write]
      - Contents [Read and write]
      - Pull requests [Read and write]
- Secret `CREDENTIALS_GITHUB_APP_PRIVATE_KEY` on format (no line break):

`-----BEGIN RSA PRIVATE KEY-----\n ... \n-----END RSA PRIVATE KEY-----`

## Use

### Usage for metrics through Git Flow

1. Create directory `.github/worfklows` in the root of your project;

2. Create file `compare.yaml` with content similar to the following:

```yaml
name: Compare
on:
  pull_request:
    types: [opened, reopened, synchronize]
    branches:
      - main
    
jobs:
  compare-time-development:
    runs-on: ubuntu-latest
    steps:
      - name: Compare Development Time
        uses: padupe/action-compare-development-time-github-app@1.0.0
        with:
          installationId: ${{ secrets.CREDENTIALS_GITHUB_APP_INSTALLATION_ID }}
          appId: ${{ secrets.CREDENTIALS_GITHUB_APP_ID }}
          privateKey: ${{ secrets.CREDENTIALS_GITHUB_APP_PRIVATE_KEY }}
```

### General use

```yaml
        uses: padupe/action-compare-development-time-github-app@1.0.0
        with:
          installationId: ${{ secrets.CREDENTIALS_GITHUB_APP_INSTALLATION_ID }}
          appId: ${{ secrets.CREDENTIALS_GITHUB_APP_ID }}
          privateKey: ${{ secrets.CREDENTIALS_GITHUB_APP_PRIVATE_KEY }}
```

## Output

`interval` in days.

## Contribute to the Project

Check our [CONTRIBUTING](./CONTRIBUTING.md) guidelines.