# Giphub [![build status](https://travis-ci.org/severest/giphub.svg?branch=master)](https://travis-ci.org/severest/giphub)
Giphub let's you insert Giphy GIFs from within GitHub.

## Build steps
1. `npm ci` – Downloads all dependencies
2. `npm run-script build` – Builds the extension in ./build.
3. `npm run-script compress` – Packages ./build into a Chrome extension.

## Development
Start with `npm install` to fetch and download all dependencies.

* `npm outdated` – List outdated dependencies
* `npm run-script dev` – Builds the extension in ./dev and runs a web server on localhost for hot-reloading to ease development.
* `npm run-script lint` – List warning and errors in the code using ESLint
