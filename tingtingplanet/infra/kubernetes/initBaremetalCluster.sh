#!/bin/bash

PROJECTS=$1
if [ -z "$PROJECTS" ]
then
    echo "PROJECTS should be passed as arguments (ex. tingting,mossland)"
    exit 1
fi

# nginx ingress controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install aka-system ingress-nginx/ingress-nginx -n kube-system

# cert manager
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.8.0/cert-manager.yaml
kubectl apply -f infra/kubernetes/cluster-issuer.yaml

# mongo
helm repo add mongodb https://mongodb.github.io/helm-charts
helm install community-operator mongodb/community-operator --namespace mongodb --create-namespace --set operator.watchNamespace="*"
kubectl apply -f infra/kubernetes/mongodb/clusterwide

# metrics
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# aka
kubectl create ns aka-system

# namespaces
IFS=',' read -ra projects <<< $PROJECTS
for project in ${projects[@]}
do
    kubectl create ns $project-debug
    kubectl create ns $project-develop
    kubectl create ns $project-main
    kubectl apply -f infra/kubernetes/secrets.yaml -n $project-debug
    kubectl apply -f infra/kubernetes/secrets.yaml -n $project-develop
    kubectl apply -f infra/kubernetes/secrets.yaml -n $project-main
    kubectl apply -f infra/kubernetes/mongodb/rbac -n $project-main
    kubectl apply -f infra/kubernetes/mongodb/rbac -n $project-develop
    kubectl apply -f infra/kubernetes/mongodb/rbac -n $project-debug
    kubectl apply -f infra/debug/$project -n $project-debug
    kubectl apply -f infra/develop/$project -n $project-develop
    kubectl apply -f infra/main/$project -n $project-main
done


