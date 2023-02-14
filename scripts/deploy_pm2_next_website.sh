#!/bin/bash
set -e # 에러나면 바로 멈춤

env=$1
app_name="<APP_NAME>"
ssh_alias="${env}_<SSH_HOST_ALIAS>"
NEXT_PUBLIC_BASE_URL=""
DOMAIN="example.com"
dir_root_path=dicle/landing_website
PORT=3010


if [ "$env" = "prod" ]; then
  region="ap-northeast-2"
  NEXT_PUBLIC_BASE_URL="prod-api.$DOMAIN"
elif [ "$env" = "dev" ]; then
  retion="ap-northeast-2"
  NEXT_PUBLIC_BASE_URL="dev-api.$DOMAIN"
elif [ "$env" = "" ]; then
  echo "please provide environment"
  exit 1
else
  echo 'not supported environment'
  exit 1
fi

ssh $ssh_alias "mkdir -p $app_name"

cd $dir_root_path
# yarn install
# NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL yarn build
scp -r ./package.json $ssh_alias:"~/$app_name/"
scp -r ./yarn.lock $ssh_alias:"~/$app_name/"
scp -r ./.next $ssh_alias:"~/$app_name/"
scp -r ./public $ssh_alias:"~/$app_name/"
scp -r ./next.config.js $ssh_alias:"~/$app_name/"
ssh $ssh_alias "cd $app_name && yarn install && pm2 delete $app_name 2> /dev/null || true && NODE_ENV=${env} PORT=$PORT pm2 start yarn --name $app_name -- start"