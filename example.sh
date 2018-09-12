#!/usr/bin/env bash

# explicitly create log file
if [ ! -f ./logs/example.log ]; then
  touch ./logs/example.log
fi

echo "example" >> ./logs/example.log
