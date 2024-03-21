#!/bin/bash
DELAY=5
docker-compose --file ../docker-compose.yml down -v
rm -rf ../data
docker-compose --file ../docker-compose.yml up -d
echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY
docker exec mongo1 /scripts/rs-init.sh