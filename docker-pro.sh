export API=$1
export DBUSER=$2
export DBPASSWORD=$3
export HOST=$4
docker compose -f ./docker/docker-compose.yml \
               -f ./docker/serviceBase/docker-compose.backend.yml \
               -f ./docker/serviceBase/docker-compose.database.yml \
               -f ./docker/serviceBase/docker-compose.frontend.yml \
               -f ./docker/serviceBase/docker-compose.nginx.yml \
               -f ./docker/serviceProduction/docker-compose.frontend.yml \
               up -d --build