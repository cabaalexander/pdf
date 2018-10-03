#!/bin/bash

LOG="./install-deps.log"

main(){
  touch $LOG

  echo "Installing debian dependencies check ($LOG) for more info"

  while read -s DEP
  do
    sudo apt-get install $DEP -y >> "$LOG"
  done <debian-dependencies
}

[ -f $LOG ] \
  && echo "All debian dependencies are up to date" \
  || main

