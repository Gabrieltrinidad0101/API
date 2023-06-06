docker compose -f ./docker/docker-compose.yml \
               -f ./docker/serviceBase/docker-compose.backend.yml \
               -f ./docker/serviceBase/docker-compose.database.yml \
               -f ./docker/serviceBase/docker-compose.frontend.yml \
               -f ./docker/serviceBase/docker-compose.nginx.yml \
               -f ./docker/serviceDevelopment/docker-compose.frontend.yml down