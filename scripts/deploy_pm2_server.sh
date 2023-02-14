#!/bin/bash
set -e # 에러나면 바로 멈춤

env=$1
app_name="app_server"
ssh_alias="${env}_app_server"
dir_root_path=server
PORT=3005


if [ "$env" = "prod" ]; then
  region="ap-northeast-2"
elif [ "$env" = "dev" ]; then
  retion="ap-northeast-2"
elif [ "$env" = "" ]; then
  echo "please provide environment"
  exit 1
else
  echo 'not supported environment'
  exit 1
fi

ssh $ssh_alias "mkdir -p $app_name/src/infra"

cd $dir_root_path
npm install
npm run build
scp -r ./package.json $ssh_alias:~/$app_name/
scp -r ./dist $ssh_alias:~/$app_name/
scp -r ./src/public $ssh_alias:~/$app_name/
scp -r ./src/infra/swagger $ssh_alias:~/$app_name/src/infra/
ssh $ssh_alias "cd $app_name && npm install && pm2 delete $app_name 2> /dev/null || true && NODE_ENV=${env} PORT=$PORT pm2 start npm --name $app_name -- start"