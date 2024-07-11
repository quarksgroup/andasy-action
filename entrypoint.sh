#!/bin/sh -l

if [ -n "$ANDASY_PROJECT_PATH" ]; then
  PREV_PATH=$(pwd)
  # Allow user to change directories in which to run Andasy commands
  cd "$ANDASY_PROJECT_PATH" || exit
fi


# Default to deploying with a remote builder unless local is specified explicitly
STRATEGY="-m remote"

for i in "$@" ; do
  if [[ $i == "-m local" ]] ; then
    STRATEGY=""
    break
  fi
done

if [[ $1 != "deploy" ]] ; then
  # Strategy only relevant to deployments so strip if not a deploy
  STRATEGY=""
fi

sh -c "andasy $* $STRATEGY"

ACTUAL_EXIT="$?"

if [ -n "$PREV_PATH" ]; then
  # If we changed directories before, we should go back to where we were.
  cd "$PREV_PATH" || exit
fi

exit $ACTUAL_EXIT