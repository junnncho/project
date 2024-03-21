#!/bin/bash

REPO_NAME="junJS"
USER="root"
HOST="test.hobbies.team"
PORT=5002
SECRET_MAP=$(infra/_general/jenkins/getEnvs.sh)

ssh -o StrictHostKeyChecking=no $USER@$HOST -p $PORT "chmod 777 -R /var/jenkins_secret/"
for SECRET in ${SECRET_MAP[@]}; do
    IFS=',' read -ra DATA <<< $SECRET
    FILE_PATH=${DATA[0]}
    SECRET_ID=${DATA[1]}
    ENV_TYPE=${DATA[2]}
    if [ -z "$ENV_TYPE" ]
    then
        DAT=($FILE_PATH)
        FILE_PATH=${DAT[0]}
        SECRET_ID=${DAT[1]}
        ENV_TYPE=${DAT[2]}
    fi
    DIRNAME=$(dirname "$FILE_PATH")
    FILENAME=$(basename "$FILE_PATH")
    ssh -o StrictHostKeyChecking=no $USER@$HOST -p $PORT "mkdir -p /var/jenkins_secret/$REPO_NAME/$DIRNAME"
    scp -o StrictHostKeyChecking=no -rp -P $PORT $FILE_PATH $USER@$HOST:/var/jenkins_secret/$REPO_NAME/$FILE_PATH
    echo "${SECRET_ID} Upload Completed"
done