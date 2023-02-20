# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [1.0.0](https://github.com/padupe/action-compare-development-time-github-app/releases/tag/1.0.0) - 2023-02-13
 
### Added

- Action's initial structure
    - `DIR .github`
        - `pullrequest_template.md`
    - `DIR assets`
        - `comment-example.jpeg`
    - `DIR dist`
        - `index.js`
        - `index.js.map`
        - `license.txt`
        - `sourcemap-register.js`
    - `DIR src`
        - `DIR appOctokit`
            - `octokit`
        - `DIR repositories`
            - `GitHubRepository.ts`
            - `IGitHubRepository.ts`
        - `DIR service`
            - `compareDevelopmentTime.ts`
        - `index.ts`
    - `action.yaml`
    - `CHANGELOG.md`
    - `CODEOWNERS`
    - `package.json`
    - `README.md`
    - `tsconfig.json`
    - `yarn.lock`
- CODEOWNERS
- Documentation