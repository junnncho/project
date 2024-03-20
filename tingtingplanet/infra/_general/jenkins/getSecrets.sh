#!/bin/bash
SECRET_MAP=( "infra/_general/dns/secrets.sh,tingting-dns-secret,general" \
"infra/kubernetes/secrets.yaml,tingting-kube-secret,general" \
"infra/kubernetes/kubeconfig.yaml,tingting-kube-config,general" \
"secure/.jenkins.conf,tingting-jenkins-conf,general" \
"infra/debug/localjobs/secrets.yaml,tingting-localjobs-secret-debug,debug" \
"infra/develop/localjobs/secrets.yaml,tingting-localjobs-secret-develop,develop" \
"infra/main/localjobs/secrets.yaml,tingting-localjobs-secret-main,main" \
"infra/debug/seniorlove/secrets.yaml,tingting-seniorlove-secret-debug,debug" \
"infra/develop/seniorlove/secrets.yaml,tingting-seniorlove-secret-develop,develop" \
"infra/main/seniorlove/secrets.yaml,tingting-seniorlove-secret-main,main" \
)

for SECRET in ${SECRET_MAP[@]}; do
    echo ${SECRET}
done
exit 0