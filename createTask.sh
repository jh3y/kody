#!/bin/bash

while getopts :a:d:t:f: name
do
  case $name in
    a)author=$OPTARG
    ;;
    d)description=$OPTARG
    ;;
    t)title=$OPTARG
    ;;
    f)file=$OPTARG
    ;;
    *)echo "Invalid arg";;
    esac
done

sed -e "s/@AUTHOR/$author/g" -e "s/@TITLE/$title/g" -e "s/@DESCRIPTION/$description/g" src/lib/task.boilerplate > src/lib/tasks/$file.js

echo New task created at src/lib/tasks/$file.js
