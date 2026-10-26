# Contributing

Thank you for considering a contribution to MetaData.

## Report bugs and propose features

- Search existing [issues](https://github.com/M003aad/MetaData.Js/issues) before opening a new one.
- For bugs, include the Node.js version, command used, expected and actual behavior, and a minimal reproduction.
- For feature proposals, describe the use case and the behavior you would expect.
- Do not include private images or images containing personal information in public reports.
- For a security concern, follow [SECURITY.md](./SECURITY.md) instead of opening a public issue.

## Local development

1. Install Node.js 20.9 or newer and npm.
2. Clone the repository and install its locked dependencies:

   ```bash
   git clone https://github.com/M003aad/MetaData.Js.git
   cd MetaData.Js
   npm ci
   ```

3. Create an `images/` directory and place a test image at `images/dream.jpg`. The directory is ignored by Git.
4. Run the relevant command:

   ```bash
   npm run read
   npm run delete
   ```

The project currently has no configured linter, test runner, or build step. CI runs both scripts against a generated image fixture.

## Pull requests

- Keep changes focused and explain their motivation.
- Update documentation when behavior or commands change.
- Run the relevant scripts locally and describe the checks performed in your pull request.
- Do not commit private images, generated outputs, credentials, or other sensitive data.
- Use a clear title and link related issues where applicable.
