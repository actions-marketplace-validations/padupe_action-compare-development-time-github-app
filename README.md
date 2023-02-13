# action-compare-development-time-github-app

## Description

Action that returns the interval (in days) between the start of development and the opening of the Pull Request.

**NOTE**: This action performs a comment on the registered Pull Request.

![Example Comment](./assets/comment-example.jpeg)

## Requiremets

- GitHub App

## Usage for metrics through Git Flow

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
          installationId: ${{ secrets.GITHUB_APP_INSTALLATION_ID }}
          appId: ${{ secrets.GITHUB_APP_ID }}
          privateKey: ${{ secrets.GITHUB_APP_PRIVATE_KEY }}
```

## General use

```yaml
        uses: padupe/action-compare-development-time-github-app@1.0.0
        with:
          installationId: ${{ secrets.GITHUB_APP_INSTALLATION_ID }}
          appId: ${{ secrets.GITHUB_APP_ID }}
          privateKey: ${{ secrets.GITHUB_APP_PRIVATE_KEY }}
```

## Output

`interval` in days.