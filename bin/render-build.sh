#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rails tailwindcss:build
SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile
SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:clean
