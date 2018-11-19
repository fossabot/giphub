# Giphub [![build status](https://travis-ci.org/severest/giphub.svg?branch=master)](https://travis-ci.org/severest/giphub)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjaller94%2Fgiphub.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjaller94%2Fgiphub?ref=badge_shield)
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

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjaller94%2Fgiphub.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjaller94%2Fgiphub?ref=badge_large)
