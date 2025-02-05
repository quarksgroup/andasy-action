#!/bin/bash -l

if ! [ -n "$ANDASY_ACCESS_TOKEN" ]; then
  echo "ANDASY_ACCESS_TOKEN is missing."
  echo "visit https://github.com/quarksgroup/andasy-action/blob/main/README.md#prerequisites."
  exit 1
fi

if [ -n "$INPUT_PROJECT_PATH" ]; then
  PREV_PATH=$(pwd)
  # Allow user to change directories in which to run Andasy commands.
  cd "$INPUT_PROJECT_PATH" || exit
  echo "Running deploy inside $INPUT_PROJECT_PATH"
fi

# Default to deploying with a local builder unless remote is specified explicitly.
STRATEGY="local"

if [ -n "$INPUT_BUILD_MODE" ]; then
  if [ "$INPUT_BUILD_MODE" = "remote" ]; then
    echo "Using remote builder"
    STRATEGY="remote"
  fi
fi

DEFAULT_DOCKER_SOCK="/var/run/docker.sock"

if ! [ -S "$DEFAULT_DOCKER_SOCK" ]; then
  if [ "$STRATEGY" = "local" ]; then
    echo "Local docker daemon doesn't seem to be up. Fallback to remote builder."
    STRATEGY="remote"
  fi
fi

if ! [ -f "config.hcl" ]; then
  echo "config.hcl with existing app name is required."
  echo 'Generate it by running "andasy setup" inside your project.'
  exit 1
fi

if ! [ -f "Dockerfile" ]; then
  echo "Dockerfile of your project is required."
  echo 'Generate it by running "andasy setup" inside your project.'
  exit 1
fi

andasy deploy -m $STRATEGY

ACTUAL_EXIT="$?"

if [ -n "$PREV_PATH" ]; then
  # If we changed directories before, we should go back to where we were.
  cd "$PREV_PATH" || exit
fi

exit $ACTUAL_EXIT
