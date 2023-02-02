# shopstory-examples

## Setup

**Before you start setting up the repository, please make sure you met below requirments:**

```
Node.js >= 16
```

1. Start by cloning the repository.
2. Now you've the install the dependencies. Before you do that, you've to set `NPM_TOKEN` environment variable to gain access to our private packages used within repository. Ask us and we will send it to you. If you're running Mac/Linux you can set environment variable by running `export NPM_TOKEN=$token` in your CMD. If you're running Windows run `set NPM_TOKEN=$token` in your CMD. To correctly authenticate using provided NPM token you have to add `//registry.npmjs.org/:_authToken=${NPM_TOKEN}` to your `.npmrc` file. You will find this file within your user's profile directory. If it's missing, create one. Don't replace `NPM_TOKEN` within that line with provided token, we will read it from the defined environments variables.
3. Run `npm install` from within root directory.
