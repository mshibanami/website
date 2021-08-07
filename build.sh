#!/bin/bash

set -ex

npm install

npm run build
npm run export

touch out/.nojekyll
