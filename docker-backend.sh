docker compose -f ./docker/docker-compose.yml \
               -f ./docker/serviceBase/docker-compose.backend.yml \
               -f ./docker/serviceBase/docker-compose.database.yml \
               up -d --build