#!/bin/bash

# Customize Start
env=$1
app_name=""
module_name=""
profile=""
terraform_ecr_output_name=""
port=""
# Customize End

ssh_alias=${env}_${app_name}
cd terraform
ecr_url=$(terraform output -raw ${terraform_ecr_output_name} | xargs)
full_env=""

cd ../
if [ $env == "prod" ]
then
    region="ap-northeast-2"
    full_env="production"
elif [ $env == "dev" ]
then
    region="ap-northeast-2"
    full_env="development"
elif [ $env == "qa" ]
then
    region="ap-northeast-2"
    full_env="development"
fi


set -e ## 에러나면 바로 중지

cd terraform
terraform workspace select $env
cd ../

cd "${module_name}" && docker build --platform linux/amd64 \
    --build-arg NODE_ENV=$env \
    --build-arg APP_NAME=$app_name \
    -m 8g -t "${app_name}_${module_name}" . \
    && cd ../


echo "docker tag ${app_name}_${module_name} $ecr_url"
docker tag ${app_name}_${module_name} $ecr_url
echo "aws --profile ${profile} ecr get-login-password --region $region | docker login --username AWS --password-stdin $ecr_url"
aws --profile ${profile} ecr get-login-password --region $region | docker login --username AWS --password-stdin $ecr_url
docker push "$ecr_url:latest"
set -x # allow error
ssh ${ssh_alias} "\$(aws ecr get-login --region $region --no-include-email)&&docker pull $ecr_url:latest"
ssh ${ssh_alias} "docker rm -f \$(docker ps -aq -f 'name=${app_name}_${module_name}')" || true # 실패해도 넘어가도록
ssh ${ssh_alias} "docker run -p ${port}:${port} -d --name ${app_name}_${module_name} -v /etc/ssl:/etc/ssl -v /etc/pki:/etc/pki $ecr_url:latest"
ssh ${ssh_alias} 'docker rmi $(docker images -aq)'
docker rmi $(docker images -aq)