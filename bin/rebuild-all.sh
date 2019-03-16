#!/bin/bash
rm yarn.lock
rm -rf node_modules/@sixty-nine-packages
yarn
lerna link convert
lerna bootstrap
lerna run build

