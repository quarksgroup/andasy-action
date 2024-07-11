# Andasy-action

Andasy-action is a GitHub Action designed to deploy your GitHub repository to the [andasy.io](https://andasy.io/) platform. This action automates the deployment process using the `andasy-cli`.

## Features

* **Automated Deployment** : Deploy your project to `andasy.io` with ease.
* **Secure Authentication** : Use `ANDASY_ACCESS_TOKEN` or `ANDASY_API_TOKEN` for secure access.
* **Customizable Workflows** : Easily integrate with your existing CI/CD workflows.

## Prerequisites

### Obtain Access Token

1. Run the following command on your local machine with authenticated account on Andasy and obtain your token:
   ```
   andasy auth token
   ```
2. Copy the generated token value.

### Set Up Repository Secrets

Add the copied token value to your GitHub repository secrets:

1. Navigate to your repository on GitHub.
2. Go to `Settings` > `Secrets and variables` > `Actions`.
3. Click `New repository secret`.
4. Add a new secret with the name `ANDASY_ACCESS_TOKEN` (or `ANDASY_API_TOKEN`) and paste the token as it's value or (`Secret *` field).

## Usage

To use the `andasy-action`, you'll need to create or update your workflow file (usually located at `.github/workflows/deploy.yml`).

### Example Workflow

Here's an example of how to use `andasy-action` in a workflow file:

```
name: Deployment to Andasy
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
jobs:
  deploy:
    name: Deploy App
    runs-on: ubuntu-latest
    steps:
        uses: actions/checkout@v2
        uses: iradukunda1/andasy-action@main
        env:
          # you can use either one of these according to your need
          ANDASY_ACCESS_TOKEN: ${{ secrets.ANDASY_ACCESS_TOKEN }}
          ANDASY_API_TOKEN: ${{ secrets.ANDASY_API_TOKEN }}

```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the Apache file for detail

Andasy action is github action for andasy-cli interaction.
