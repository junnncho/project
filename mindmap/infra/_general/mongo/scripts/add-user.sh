#!/bin/bash

mongosh -u admin "admin" -p "PASSWORD" --authenticationDatabase "admin" --port 27017 <<EOF
db.createUser({
    user: "supportuber-backend",
    pwd: "PASSWORD",
    roles: [{
        role: "readWrite",
        db: "supportuber"
    
    }]
})
db.createUser({
    user: "junblog-backend",
    pwd: "PASSWORD",
    roles: [{
        role: "readWrite",
        db: "junblog"
    
    }]
})
EOF