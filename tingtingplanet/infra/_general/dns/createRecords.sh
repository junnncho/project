HOSTED_ZONE=Z04713842WQ0E9925MWHH # tingting.com
RECORD_MAP=( \
# "tingting.com,66.94.115.83", \
# "www.tingting.com,66.94.115.83", \
# "system.tingting.com,66.94.115.83", \
# "node.master-0.tingting.com,66.94.115.83", \
# "node.master-1.tingting.com,66.94.115.38", \
# "node.master-2.tingting.com,66.94.115.226", \
# "node.db-0.tingting.com,66.94.118.104", \
# "node.db-1.tingting.com,154.53.57.45", \
# "node.db-2.tingting.com,154.12.241.222", \
# "node.batch.tingting.com,154.12.242.47", \
# "node.reserve-0.tingting.com,144.126.147.208", \
# "dsc.build.tingting.com,54.180.9.60", \
# "dsc.master-0.tingting.com,13.124.8.16", \
# "dsc.db-0.tingting.com,43.200.77.37", \
"dsc.jenkins.tingting.com,43.200.157.131", \
# "node.blockchain.tingting.com,154.12.242.47", \
# "debugnet.ethereum.tingting.com,66.94.115.83", \
# "debugnet.klaytn.tingting.com,66.94.115.83", \
# "backend.tingting.com,66.94.115.83", \
# "tingting.backend.tingting.com,66.94.115.83", \
# "testnet.tingting.backend.tingting.com,66.94.115.83", \
# "debugnet.tingting.backend.tingting.com,66.94.115.83", \
# "frontend.tingting.com,66.94.115.83", \
# "tingting.frontend.tingting.com,66.94.115.83", \
# "testnet.tingting.frontend.tingting.com,66.94.115.83", \
# "debugnet.tingting.frontend.tingting.com,66.94.115.83", \
# "tingting.mongo-0.tingting.com,66.94.118.104", \
# "tingting.mongo-1.tingting.com,154.53.57.45", \
# "tingting.mongo-2.tingting.com,154.12.241.222", \
# "tingting.redis-0.tingting.com,66.94.118.104", \
# "tingting.redis-1.tingting.com,154.53.57.45", \
# "tingting.redis-2.tingting.com,154.12.241.222", \
# "testnet.tingting.mongo-0.tingting.com,66.94.118.104", \
# "testnet.tingting.mongo-1.tingting.com,154.53.57.45", \
# "testnet.tingting.mongo-2.tingting.com,154.12.241.222", \
# "testnet.tingting.redis-0.tingting.com,66.94.118.104", \
# "testnet.tingting.redis-1.tingting.com,154.53.57.45", \
# "testnet.tingting.redis-2.tingting.com,154.12.241.222", \
# "debugnet.tingting.mongo-0.tingting.com,66.94.118.104", \
# "debugnet.tingting.mongo-1.tingting.com,154.53.57.45", \
# "debugnet.tingting.mongo-2.tingting.com,154.12.241.222", \
# "debugnet.tingting.redis-0.tingting.com,66.94.118.104", \
# "debugnet.tingting.redis-1.tingting.com,154.53.57.45", \
# "debugnet.tingting.redis-2.tingting.com,154.12.241.222", \
 )
for RECORD in ${RECORD_MAP[@]}; do
    IFS=',' read -ra DATA <<< $RECORD
    DOMAIN=${DATA[0]}
    A_RECORD=${DATA[1]}
    rm -rf record.json
    cat <<EOF >> record.json
    {
        "Comment": "UPSERT",
        "Changes": [{
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "${DOMAIN}",
                "Type": "A",
                "TTL": 300,
                "ResourceRecords": [{ "Value": "${A_RECORD}"}]
            }
        }]
    }
EOF
    aws route53 change-resource-record-sets --hosted-zone-id $HOSTED_ZONE --change-batch file://record.json
done
rm record.json
exit 0