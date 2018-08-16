# Giphub [![build status](https://travis-ci.org/severest/giphub.svg?branch=master)](https://travis-ci.org/severest/giphub)
Giphub let's you insert Giphy GIFs from within GitHub.

## Build steps
1. `yarn install --no-lockfile` – Downloads all dependencies
2. `yarn build` – Builds the extension in ./build.
3. `yarn compress` – Packages ./build into a Chrome extension.

## Development
Start with `yarn install` to fetch and download all dependencies.

* `yarn outdated` – List outdated dependencies
* `yarn dev` – Builds the extension in ./dev and runs a web server on localhost for hot-reloading to ease development.
* `yarn lint` – List warning and errors in the code using ESLint
