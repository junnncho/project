read -p "ID " id
read -p "PW " pw
if [ -z "$id" ] || [ -z "$pw" ]; then
    echo "Usage: $0 <id> <pw>"
    exit 1
fi
echo "ID: $id PW: $pw"
docker run --rm httpd htpasswd -Bbn $id $pw >>./app/auth/htpasswd
echo

echo "### Down registry ..."
docker-compose down docker-registry
echo "### Starting registry ..."
docker-compose up -d docker-registry