#!/bin/bash
DELAY=25
mongosh admin<<EOF
var config = {
    "_id": "myReplicaSet",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo1",
            "priority": 2
        },
        {
            "_id": 2,
            "host": "mongo2",
        },
        {
            "_id": 3,
            "host": "mongo3",
        }
    ]
};
rs.initiate(config, { force: true });
quit()
EOF
echo "****** Waiting for 5 seconds for replicaset configuration to be applied ******"
sleep 5
mongosh admin <<EOF
use admin;
use admin;
quit()
EOF
sleep 5
mongosh admin <<EOF
use admin;
use admin;
quit()
EOF

mongosh admin <<EOF
use admin;
use admin;
db.createUser({
    user: "admin",
    pwd: "PASSWORD",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "dbAdminAnyDatabase", db: "admin" },
        { role: "readWriteAnyDatabase", db: "admin" },
        { role: "clusterMonitor", db:"admin"} 
    ]
});
EOF

echo "****** Waiting for ${DELAY} seconds for replicaset configuration to be applied ******"
sleep $DELAY