#!/bin/bash

MASTER_IP=$1
NODE_TOKEN=$2
if [ -z "$MASTER_IP" or -z "$NODE_TOKEN" ]
then
    echo "MASTER_IP and NODE_Token should be passed as arguments"
    exit 1
fi

curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs && sudo apt-get install -y build-essential && sudo apt-get install -y docker.io && sudo usermod -aG docker root
sudo add-apt-repository universe && sudo apt update && sudo apt install -y python2-minimal && sudo apt-get install -y docker-compose
sudo ufw disable
sudo apt update
sudo apt install -y docker.io nfs-common dnsutils curl

# For Master
curl -sfL https://get.k3s.io | K3S_URL=https://$MASTER_IP:6443 K3S_TOKEN=$NODE_TOKEN sh -s -
