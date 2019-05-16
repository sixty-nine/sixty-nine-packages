#!/bin/bash
rm yarn.lock
rm -rf node_modules/@sixty-nine-packages
yarn
node_modules/.bin/lerna link convert
node_modules/.bin/lerna bootstrap
node_modules/.bin/lerna run build

