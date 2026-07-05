#!/bin/bash
set -a
source .env.local
set +a

git pull origin main

docker build \
  --build-arg DATABASE_URL=$DATABASE_URL \
  -f Dockerfile \
  -t portofolio-app .

docker rm -f portofolio-server

docker run -d \
  --name portofolio-server \
  --restart always \
  --network portofolio_net \
  -p 127.0.0.1:3002:3000 \
  --env DATABASE_URL=$DATABASE_URL \
  portofolio-app

echo "Deploy portofolio selesai!"
