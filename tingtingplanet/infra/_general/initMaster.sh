#!/bin/bash

HOST_NAME=$(cat /etc/hostname)
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs && sudo apt-get install -y build-essential && sudo apt-get install -y docker.io && sudo usermod -aG docker root
sudo add-apt-repository universe && sudo apt update && sudo apt install -y python2-minimal && sudo apt-get install -y docker-compose
sudo ufw disable
sudo apt update
sudo apt install -y docker.io nfs-common dnsutils curl snapd
snap install helm --classic
snap install kubectx --classic

# For Master
curl -sfL https://get.k3s.io | sh -s - --disable traefik --disable metrics-server server --cluster-init
mkdir ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown -R $(id -u):$(id -g) ~/.kube
echo "export KUBECONFIG=~/.kube/config" >> ~/.bashrc
source ~/.bashrc
MASTER_IP=$(kubectl get node $HOST_NAME -ojsonpath="{.status.addresses[0].address}")
NODE_TOKEN=$(sudo cat /var/lib/rancher/k3s/server/node-token)

echo $MASTER_IP
echo $NODE_TOKEN