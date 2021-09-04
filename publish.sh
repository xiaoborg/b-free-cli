#!/bin/bash

__max_third_version=20
__max_second_version=10

# Introduce jq
JQ_EXEC=`which jq`

file_path=package.json
old_version=$(cat $file_path | ${JQ_EXEC} .version | sed 's/\"//g')
echo "old version: $old_version"

# update package version
OLD_IFS="$IFS"
IFS="."
arr=($old_version)
IFS="$OLD_IFS"
if [ ${arr[2]} -lt $__max_third_version ]
then
  npm version patch --force
else
  if [ ${arr[1]} -lt $__max_third_version ]
  then
    npm version minor --force
  else
    npm version major --force
  fi
fi

npmLoginConfig=npm.login.config.json
Username=$(cat $npmLoginConfig | ${JQ_EXEC} .Username | sed 's/\"//g')
Password=$(cat $npmLoginConfig | ${JQ_EXEC} .Password | sed 's/\"//g')
Email=$(cat $npmLoginConfig | ${JQ_EXEC} .Email | sed 's/\"//g')

# get version
version=$(cat $file_path | ${JQ_EXEC} .version | sed 's/\"//g')
echo "current version:$version"

echo '---Git Start---'
git add .
git commit -m "$version"
git push origin master
echo '---Git End---'


# login npm
echo '---Npm Publish---'
expect <<EOF
  spawn npm login

  expect "Username:"
  send "$Username\r"

  expect "Password:"
  send "$Password\r"

  expect "Email:"
  send "$Email\r"
  expect
EOF


npm publish


# echo '---Npm Publish End---'


