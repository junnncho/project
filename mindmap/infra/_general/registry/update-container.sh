#!/bin/bash
SECRET_MAP=$(infra/_general/jenkins/getEnvs.sh)

for SECRET in ${SECRET_MAP[@]}; do
    IFS=',' read -ra DATA <<< $SECRET
    SECRET_ID=${DATA[1]}
    PORT=${DATA[3]}

    # Check if SECRET_ID matches $2
    if [[ $SECRET_ID == $2 ]]; then
        # Check if container with $3 image is running
        echo "PASS $2"

        # Delete container if it exists
        if docker ps -a --format '{{.Names}}' | grep -q "^$SECRET_ID$"; then
            docker rm -f $SECRET_ID
        fi
        if docker ps -a --format '{{.Image}}' | grep -q $3; then
            echo "GREP $3"
            # Delete container with $3 image
            docker rm -f $(docker ps -a --format '{{.ID}}' --filter "ancestor=$3")
        fi
        
        # Start new container with $3 image
        if [[ $1 == "SERVER" ]]; then
            echo "SERVER $PORT"
            mkdir -p /var/server_data
            docker run -d --name $SECRET_ID --restart=unless-stopped --env SERVER_MODE=all -v /var/server_data:/data -p $PORT:8080 $3
        elif [[ $1 == "CLIENT" ]]; then
            docker run -d --name $SECRET_ID --restart=unless-stopped -p $PORT:4200 $3
        else
            echo "Invalid argument for \$1"
            exit 1
        fi
    fi
done
exit 0