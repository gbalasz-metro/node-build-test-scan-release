#!/usr/bin/env bash

echo "Performing NodeJS steps..."

npm install -g yarn
yarn
yarn test
